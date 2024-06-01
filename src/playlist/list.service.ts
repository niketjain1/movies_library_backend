import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { MovieService } from '../movie/movie.service';
import { List } from './list.enitity';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private listRepository: Repository<List>,
    private movieService: MovieService,
  ) {}

  async createList(user: User, name: string, isPublic: boolean): Promise<List> {
    const list = this.listRepository.create({ user, name, isPublic });
    return await this.listRepository.save(list);
  }

  async addMovieToList(user: User, listId: number, movieTitle: string): Promise<List> {
    const list = await this.listRepository.findOne({ where: { id: listId, user }, relations: ['movies'] });

    if (!list) {
      throw new NotFoundException(`List with id "${listId}" not found`);
    }

    const movie = await this.movieService.findMovieByTitle(movieTitle);
    list.movies.push(movie);

    return await this.listRepository.save(list);
  }

  async getListsByUser(user: User): Promise<List[]> {
    return await this.listRepository.find({ where: { user }, relations: ['movies'] });
  }

  async getPublicList(listId: number): Promise<List> {
    const list = await this.listRepository.findOne({ where: { id: listId, isPublic: true }, relations: ['movies'] });

    if (!list) {
      throw new NotFoundException(`Public list with id "${listId}" not found`);
    }

    return list;
  }
}
