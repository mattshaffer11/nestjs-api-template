import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TodoByUuidPipe } from './pipes';

@Module({
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
