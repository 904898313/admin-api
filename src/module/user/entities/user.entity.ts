import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'user' })
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn({ type: 'int', comment: '主键id' })
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false, comment: '商户名称' })
  username: string;

  @Column({ type: 'varchar', length: 100, nullable: false, comment: '密码' })
  password: string;

  @Column({ type: 'varchar', length: 50, nullable: true, comment: '手机号码' })
  mobile: string | null;

  @Column({
    type: 'tinyint',
    width: 4,
    default: 0,
    comment: '状态,0表示正常,1表示禁止',
  })
  status: number;

  @Column({ type: 'varchar', length: 200, nullable: true, comment: '具体地址' })
  address: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true, comment: '描述' })
  description: string | null;

  @CreateDateColumn({
    type: 'timestamp',
    // default: () => 'CURRENT_TIMESTAMP',
    comment: '创建时间',
  })
  created_time: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    // default: () => 'CURRENT_TIMESTAMP',
    // onUpdate: 'CURRENT_TIMESTAMP',
    comment: '更新时间',
  })
  updated_time: Date;
}
