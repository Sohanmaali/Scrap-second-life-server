// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { MongooseModule } from '@nestjs/mongoose';
// import { ItemsModule } from './items/items.module';
// import { ConfigModule } from '@nestjs/config';
// import { FileModule } from './cms/files/file.module';
// import { AokModule } from './modules/aok/aok.module';
// import { AuthenticationModule } from './modules/authentication/authentication.module';
// @Module({
//   imports: [
//     // MongooseModule.forRoot('mongodb://localhost:27017/aok', {
//     //   serverSelectionTimeoutMS: 20000,

//     MongooseModule.forRoot(
//       'mongodb+srv://sohaninfobeans4:SOHAN1234@aok-cluster.k6fsd.mongodb.net/AOKDB?retryWrites=true&w=majority',
//       // process.env.DB_URL,
//       {
//         serverSelectionTimeoutMS: 20000,
//       },
//     ),
//     ConfigModule.forRoot({
//       isGlobal: true,
//     }),

//     ItemsModule,
//     // BorrowingModule,

//     FileModule,
//     AokModule,
//     AuthenticationModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {
//   constructor() {
//     console.log('app module loaded');
//     console.log('process.env.DB_URL', process.env.DB_URL);
//   }
// }

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from './items/items.module';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './cms/files/file.module';
// import { AokModule } from './modules/aok/aok.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URL, {
      serverSelectionTimeoutMS: 20000,
    }),
    ItemsModule,
    // BorrowingModule,
    FileModule,
    // AokModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log('app module loaded');
    console.log('process.env.DB_URL:', process.env.PORT); // Check if this outputs the correct DB URL
  }
}
