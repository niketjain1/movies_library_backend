import { List } from 'src/playlist/list.enitity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  userName: string;
  
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => List, (list) => list.user)
  lists?: List[];
}