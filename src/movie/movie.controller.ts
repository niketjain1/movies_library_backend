import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { MovieService } from './movie.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('movies')
@UseGuards(AuthGuard('jwt'))
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get('search')
  async searchMovie(@Query('title') title: string) {
    return this.movieService.findMovieByTitle(title);
  }
}
