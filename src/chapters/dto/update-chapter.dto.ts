import { PartialType } from '@nestjs/mapped-types';
import { CreateChapterDto } from './create-chapter.dto';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateChapterDto extends PartialType(CreateChapterDto) {
  @IsNumber()
  @IsPositive()
  id: number;
}
