import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { MovieService } from './movie.service';
  
@Controller('movies')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get('search')
  async searchMovie(@Query('title') title: string) {
    return this.movieService.findMovieByTitle(title);
  }
}
