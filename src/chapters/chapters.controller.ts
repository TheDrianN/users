import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ChaptersService } from './chapters.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { PaginationDto } from 'src/common';

@Controller()
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  @MessagePattern('createChapter')
  create(@Payload() createChapterDto: CreateChapterDto) {
    return this.chaptersService.create(createChapterDto);
  }

  @MessagePattern('findAllChapters')
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.chaptersService.findAll(paginationDto);
  }

  @MessagePattern('findOneChapter')
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.chaptersService.findOne(id);
  }

  @MessagePattern('updateChapter')
  update(@Payload() updateChapterDto: UpdateChapterDto) {
    return this.chaptersService.update(updateChapterDto.id, updateChapterDto);
  }

  @MessagePattern('removeChapter')
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.chaptersService.remove(id);
  }
}
