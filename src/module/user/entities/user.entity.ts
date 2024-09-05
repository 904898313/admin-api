import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { idCard } from './idCard.entity';
import { Photo } from './photo.entity';
import { Question } from './question.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', comment: '用户id' })
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    comment: '用户名称',
    unique: true,
  })
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

  // 1对1
  @JoinColumn()
  @OneToOne(() => idCard)
  idCard: idCard;

  // 1对多
  @JoinColumn()
  @OneToMany(() => Photo, (photo) => photo.user)
  photos: Photo[];

  // 多对多
  @ManyToMany(() => Question, (question) => question.users)
  @JoinTable()
  questions: Question[];
}
