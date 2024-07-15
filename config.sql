-- 创建库
CREATE DATABASE admin_api_db DEFAULT CHARACTER SET = 'utf8mb4';
-- 选中库
USE `admin_api_db`;
-- 用户表
DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY key COMMENT '主键id',
    `username` varchar(50) NOT NULL COMMENT '商户名称',
    `password` varchar(100) NOT null COMMENT '密码',
    `mobile` varchar(50) DEFAULT NULL COMMENT '手机号码',
    `status` tinyint(4) DEFAULT 0 COMMENT '状态,0表示正常,1表示禁止',
    `address` varchar(200) DEFAULT null comment '具体地址',
    `description` varchar(255) DEFAULT NULL COMMENT '描述',
    `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    UNIQUE KEY `user_deleted_at` (`username`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COMMENT = '用户表';