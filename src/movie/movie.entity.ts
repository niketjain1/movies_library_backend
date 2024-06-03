// src/movie/movie.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  imdbID: string;

  @Column()
  imdbRating: string;

  @Column()
  title: string;

  @Column()
  year: string;

  @Column()
  genre: string;

  @Column()
  director: string;

  @Column()
  plot: string;

  @Column()
  poster: string;
}
