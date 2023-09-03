import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CredentialsModule } from './credentials/credentials.module';
import { NotesModule } from './notes/notes.module';
import { CardsModule } from './cards/cards.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UsersModule, CredentialsModule, NotesModule, CardsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
