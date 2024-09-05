import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Menu {
  @PrimaryColumn({ type: 'varchar', length: 50, comment: '菜单id' })
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false, comment: '菜单名称' })
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: true, comment: '菜单id' })
  parentId: string;
}
