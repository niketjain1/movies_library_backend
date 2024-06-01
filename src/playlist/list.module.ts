import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { MovieModule } from '../movie/movie.module';
import { List } from './list.enitity';

@Module({
  imports: [
    TypeOrmModule.forFeature([List]),
    MovieModule,
  ],
  providers: [ListService],
  controllers: [ListController],
})
export class ListModule {}
