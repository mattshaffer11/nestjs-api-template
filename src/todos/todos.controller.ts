import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { CreateTodoDto, UpdateTodoDto } from './dtos';
import { TodoByUuidPipe } from './pipes';
import { TodoEntity } from './todo.entity';
import { TodosService } from './todos.service';

@Controller({
  path: 'todos',
  version: '1',
})
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() dto: CreateTodoDto): Promise<TodoEntity> {
    return this.todosService.create(dto);
  }

  @Get()
  findAll(): Promise<TodoEntity[]> {
    return this.todosService.findAll();
  }

  @Get(':uuid')
  @ApiParam({
    name: 'uuid',
    required: true,
    type: 'string',
  })
  findOne(@Param('uuid', TodoByUuidPipe) todo: TodoEntity): TodoEntity {
    return todo;
  }

  @Patch(':uuid')
  @ApiParam({
    name: 'uuid',
    required: true,
    type: 'string',
  })
  update(
    @Param('uuid', TodoByUuidPipe) todo: TodoEntity,
    @Body() dto: UpdateTodoDto,
  ): Promise<TodoEntity> {
    return this.todosService.update(todo, dto);
  }

  @Delete(':uuid')
  @ApiParam({
    name: 'uuid',
    required: true,
    type: 'string',
  })
  remove(@Param('uuid', TodoByUuidPipe) todo: TodoEntity): Promise<void> {
    return this.todosService.remove(todo);
  }
}
