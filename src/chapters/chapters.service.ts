import { HttpStatus, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ChaptersService extends PrismaClient implements OnModuleInit{

  onModuleInit() {
    this.$connect();
    console.log('Data base connected')
  }

  create(createChapterDto: CreateChapterDto) {
    return this.chapter.create({
      data: createChapterDto
    });
  }

  async findAll( paginationDto: PaginationDto) {
    const {page,limit} = paginationDto;

    const totalPages = await this.chapter.count();
    const lastPage = Math.ceil(totalPages / limit);

    const Chapters = await this.chapter.findMany({
      skip:(page-1) * limit,
      take: limit,
    });

    const mappedChapter = Chapters.map(chapter=>(
      {
        ...chapter,
        status: chapter.status === 'H' ? 'Habilitado' : 'Inhabilitado' ,
      }
    ));

    return{
      data: mappedChapter,
      meta:{
        total: totalPages,
        page: page,
        lastPage: lastPage
      }
    }
  }

  async findOne(id: number) {
      const  chapter =  await this.chapter.findFirst({
        where:{id:id}
    });
      
    if(!chapter){
      throw new RpcException({message:`Miembro con el id ${id} no existe`,
      status:HttpStatus.BAD_REQUEST})
    }

    return {
      status:HttpStatus.ACCEPTED,
      data:chapter
    };
  }

  async update(id: number, updateChapterDto: UpdateChapterDto) {
    const{id:_ , ...data} = updateChapterDto;
    await this.findOne(id);

    return this.chapter.update({
      where:{id},
      data: data,
    });

  }

  async remove(id: number) {
    await this.findOne(id);

   const member = await this.chapter.update({
    where:{id},
    data:{
      status: 'I'
    }
   })

   return member;

  }
}
