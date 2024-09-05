import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class idCard {
  @PrimaryGeneratedColumn({ type: 'int', comment: '身份证编号id' })
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false, comment: '身份证号' })
  idNumber: string;

  // 1对1
  @OneToOne(() => User, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}
