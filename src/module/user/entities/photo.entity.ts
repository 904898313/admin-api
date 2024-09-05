import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  // JoinColumn,
  // OneToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn({ type: 'int', comment: '图片id' })
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false, comment: '图片url' })
  url: string;

  // 多对1
  @ManyToOne(() => User, (user) => user.photos)
  user: User;
}
