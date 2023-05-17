import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactModule } from './contact/contact/contact.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:Passw0rd@172.22.10.204:27017', {
      dbName: 'database_contact',
    }),
    ContactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
