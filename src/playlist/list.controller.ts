import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ListService } from './list.service';
import { AuthGuard } from '@nestjs/passport';
import { List } from './list.enitity';

@Controller('list')
export class ListController {
  constructor(private listService: ListService) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  async createList(
    @Body('name') name: string,
    @Body('isPublic') isPublic: boolean,
    @Body('userId') userId: number,
  ) {
    return this.listService.createList(userId, name, isPublic);
  }

  @Post(':id/movies')
  @UseGuards(AuthGuard('jwt'))
  async addMovieToList(
    @Param('id') id: number,
    @Body('imdbId') imdbId: string,
  ) {
    return this.listService.addMovieToList(id, imdbId);
  }

  @Get(':userId/user')
  async getUserLists(@Param('userId') userId: number) {
    return this.listService.getListsByUser(userId);
  }

  @Get(':id/public')
  async getPublicList(@Param('id') id: number) {
    return this.listService.getPublicList(id);
  }

  @Get(':listId')
  async getListById(@Param('listId') listId: number) {
    return this.listService.getListById(listId);
  }
}
