import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  // JoinColumn,
  // OneToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn({ type: 'int', comment: '问题id' })
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false, comment: '问题名称' })
  name: string;

  // 多对多
  @ManyToMany(() => User, (user) => user.questions)
  users: User[];
}
