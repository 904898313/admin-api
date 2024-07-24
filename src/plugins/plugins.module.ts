/*
 * @Author: yangchenguang
 * @Description: 插件批量注入
 * @Date: 2024-07-24 09:32:46
 * @LastEditors: yangchenguang
 * @LastEditTime: 2024-07-24 09:52:29
 */

import { Module, Global } from '@nestjs/common';
import { RedisService } from './redis/redis.service';

@Global()
@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class pluginsModule { }
