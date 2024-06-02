import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { MovieModule } from '../movie/movie.module';
import { List } from './list.enitity';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([List]), MovieModule, UsersModule],
  providers: [ListService, UsersService],
  controllers: [ListController],
})
export class ListModule {}
