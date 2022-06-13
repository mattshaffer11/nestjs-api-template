import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { TodoEntity } from '../todo.entity';
import { TodosService } from '../todos.service';

@Injectable()
export class TodoByUuidPipe
  implements PipeTransform<string, Promise<TodoEntity>>
{
  constructor(private todoService: TodosService) {}

  async transform(uuid: string): Promise<TodoEntity> {
    const todo = await this.todoService.findOne(uuid);

    if (!todo) {
      throw new NotFoundException();
    }

    return todo;
  }
}
