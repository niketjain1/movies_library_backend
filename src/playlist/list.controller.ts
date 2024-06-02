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
import { User } from 'src/users/users.entity';

@Controller('list')
@UseGuards(AuthGuard('jwt'))
export class ListController {
  constructor(private listService: ListService) {}

  @Post('create')
  async createList(
    @Body('name') name: string,
    @Body('isPublic') isPublic: boolean,
    @Body('userId') userId: number,
  ) {
    return this.listService.createList(userId, name, isPublic);
  }

  @Post(':id/movies')
  async addMovieToList(
    @Param('id') id: number,
    @Body('title') title: string,
    @Req() req: any,
  ) {
    const user: User = req.user;
    return this.listService.addMovieToList(user, id, title);
  }

  @Get()
  async getUserLists(@Body('userId') userId: number) {
    return this.listService.getListsByUser(userId);
  }

  @Get(':id/public')
  async getPublicList(@Param('id') id: number) {
    return this.listService.getPublicList(id);
  }
}
