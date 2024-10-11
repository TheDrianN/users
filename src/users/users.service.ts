import { HttpStatus, Injectable,Logger, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UsersService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('Users_Service')

  onModuleInit() {
    this.$connect();
    console.log('Data base connected')
  }


  async create(createUserDto: CreateUserDto) {
    const existingUser  = await this.user.findFirst({
      where:{document: createUserDto.document,}
    })

    if (existingUser) {
      
        throw new RpcException({
          message:`Usuario  ${createUserDto.document} ya existe`,
          status: HttpStatus.BAD_REQUEST
        })
      
   }

    return this.user.create({
      data: createUserDto
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    const totalPages = await this.user.count();
    const lastPage = Math.ceil(totalPages / limit);

    const users = await this.user.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: {
            Chapter: true // Esto asume que la relación Chapter está bien definida en Prisma
        }
    });

    // Mapea los usuarios para reemplazar los valores de rol, estado y chapter_id
    const mappedUsers = users.map(user => ({
        ...user,
        chapter: user.Chapter.name, // Aquí reemplazas chapter_id por el nombre del capítulo
        rol: user.rol === 'A' ? 'ADMINISTRADOR' : 'VOTANTE', // Cambias el rol de 'A' a 'Administrador' o 'Votante'
        status: user.status === 'V' ? 'VIGENTE' : 'NO VIGENTE' // Cambias el status a 'Habilitado' o 'Inhabilitado'
    }));

    return {
        data: mappedUsers,
        meta: {
            total: totalPages,
            page: page,
            lastPage: lastPage
        }
    };
}

  async findOne(id: number) {
    const user = await this.user.findFirst({
      where:{id}
    })

    if(!user){
      throw new RpcException({
        message:`Usuario no el id ${id} no existe`,
        status: HttpStatus.BAD_REQUEST
      })
    }

    return {
      status:HttpStatus.ACCEPTED,
      data: user
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const {id:_, ...data} = updateUserDto
    await this.findOne(id);

    return this.user.update({
      where:{id},
      data: data
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    const user = await this.user.update({
      where:{id},
      data:{
        status:'I'
      }
    })

    return user
  }

  async shearchDoc(doc: string){
  

      const users = await this.user.findFirst({
        where:{
          document:doc,
        }
      });

      if(!users){
        throw new RpcException({
          message:`Usuario ${doc} no existe`,
          status: HttpStatus.BAD_REQUEST
        })
      }
  
      return {
        status:HttpStatus.ACCEPTED,
        data: users
      };

   
   
  }
}
