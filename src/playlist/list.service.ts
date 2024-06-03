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

  async addMovieToList(listId: number, imdbId: string): Promise<List> {
    const list = await this.listRepository.findOne({
      where: { id: listId },
      relations: ['movies'],
    });

    if (!list) {
      throw new NotFoundException(`List with id "${listId}" not found`);
    }

    const movie = await this.movieService.findMovieByImdbId(imdbId);
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

  async getListById(id: number): Promise<List> {
    const list = await this.listRepository.findOne({
      where: { id: id },
      relations: ['movies'],
    });

    if (!list) {
      throw new NotFoundException(`Public list with id "${id}" not found`);
    }

    return list;
  }

  async getAllLists() {
    const lists = this.listRepository.find();
    return lists;
  }
}
