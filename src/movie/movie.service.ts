// src/movie/movie.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    private httpService: HttpService,
  ) {}

  async findMovieByTitle(title: string): Promise<Movie> {
    const movie = await this.movieRepository.findOne({
      where: { title },
    });

    if (movie) {
      return movie;
    }

    const response = await firstValueFrom(
      this.httpService.get(
        `http://www.omdbapi.com/?t=${title}&apikey=${process.env.OMDB_API_KEY}`,
      ),
    );

    const data = response.data;

    if (data === 'False') {
      throw new NotFoundException(`Movie with title "${title}" not found`);
    }

    const newMovie = this.movieRepository.create({
      imdbID: data.imdbID,
      title: data.Title,
      year: data.Year,
      genre: data.Genre,
      director: data.Director,
      plot: data.Plot,
      poster: data.Poster,
      imdbRating: data.imdbRating,
    });

    await this.movieRepository.save(newMovie);
    return newMovie;
  }

  async findMovieByImdbId(imdbId: string) {
    return await this.movieRepository.findOne({
      where: { imdbID: imdbId },
    });
  }
}
