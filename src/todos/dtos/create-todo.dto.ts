import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
import { MAX_TEXT_LENGTH, MIN_TEXT_LENGTH } from '../todos.constants';

export class CreateTodoDto {
  @ApiProperty({
    required: true,
    minimum: MIN_TEXT_LENGTH,
    maximum: MAX_TEXT_LENGTH,
  })
  @Length(MIN_TEXT_LENGTH, MAX_TEXT_LENGTH)
  @IsNotEmpty()
  readonly text: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  readonly complete: boolean;
}
