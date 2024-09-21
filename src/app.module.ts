import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ChaptersModule } from './chapters/chapters.module';

@Module({
  imports: [UsersModule,ChaptersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
