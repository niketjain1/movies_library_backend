import { Controller, Post, Body, Param, Get, UseGuards, Req } from '@nestjs/common';
import { ListService } from './list.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/users.entity';

@Controller('lists')
@UseGuards(AuthGuard('jwt'))
export class ListController {
  constructor(private listService: ListService) {}

  @Post()
  async createList(@Body('name') name: string, @Body('isPublic') isPublic: boolean, @Req() req: any) {
    const user: User = req.user;
    return this.listService.createList(user, name, isPublic);
  }

  @Post(':id/movies')
  async addMovieToList(@Param('id') id: number, @Body('title') title: string, @Req() req: any) {
    const user: User = req.user;
    return this.listService.addMovieToList(user, id, title);
  }

  @Get()
  async getUserLists(@Req() req: any) {
    const user: User = req.user;
    return this.listService.getListsByUser(user);
  }

  @Get(':id/public')
  async getPublicList(@Param('id') id: number) {
    return this.listService.getPublicList(id);
  }
}
