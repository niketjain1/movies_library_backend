import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { MovieService } from '../movie/movie.service';
import { List } from './list.enitity';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private listRepository: Repository<List>,
    private movieService: MovieService,
    private usersService: UsersService,
  ) {}

  async createList(
    userId: number,
    name: string,
    isPublic: boolean,
  ): Promise<List> {
    const user = await this.usersService.getUserById(userId);
    const list = await this.listRepository.create({
      name: name,
      user: user,
      isPublic: isPublic,
    });
    return await this.listRepository.save(list);
  }

  async addMovieToList(
    user: User,
    listId: number,
    movieTitle: string,
  ): Promise<List> {
    const list = await this.listRepository.findOne({
      where: { id: listId, user },
      relations: ['movies'],
    });

    if (!list) {
      throw new NotFoundException(`List with id "${listId}" not found`);
    }

    const movie = await this.movieService.findMovieByTitle(movieTitle);
    list.movies.push(movie);

    return await this.listRepository.save(list);
  }

  async getListsByUser(userId: number): Promise<List[]> {
    const user = await this.usersService.getUserById(userId);
    return await this.listRepository.find({
      where: { user },
      relations: ['movies'],
    });
  }

  async getPublicList(listId: number): Promise<List> {
    const list = await this.listRepository.findOne({
      where: { id: listId, isPublic: true },
      relations: ['movies'],
    });

    if (!list) {
      throw new NotFoundException(`Public list with id "${listId}" not found`);
    }

    return list;
  }
}
