import { Injectable } from '@nestjs/common';
import { CreateTodoDto, UpdateTodoDto } from './dtos';
import { TodoEntity } from './todo.entity';

@Injectable()
export class TodosService {
  async create(dto: CreateTodoDto): Promise<TodoEntity> {
    const todo = new TodoEntity();
    todo.text = dto.text;
    todo.complete = dto.complete;
    return todo.save();
  }

  async findAll(): Promise<TodoEntity[]> {
    return TodoEntity.find();
  }

  async findOne(id: string): Promise<TodoEntity | undefined> {
    try {
      return await TodoEntity.findOne({ where: { id } });
    } catch (e) {
      return undefined;
    }
  }

  async update(todo: TodoEntity, dto: UpdateTodoDto): Promise<TodoEntity> {
    Object.assign(todo, dto);
    return todo.save();
  }

  async remove(todo: TodoEntity) {
    await todo.remove();
  }
}
