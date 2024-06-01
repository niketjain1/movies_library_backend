// src/list/list.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, ManyToMany } from 'typeorm';
import { Movie } from '../movie/movie.entity';
import { User } from 'src/users/users.entity';

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: false })
  isPublic: boolean;

  @ManyToOne(() => User, (user) => user.lists)
  user: User;

  @ManyToMany(() => Movie)
  @JoinTable()
  movies: Movie[];
}
