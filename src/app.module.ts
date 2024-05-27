import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database.module';
import { ResourceModule } from './modules/resource/resource.module';
import { ConfigModule } from '@nestjs/config';
import { AdminPageModule } from './modules/admin/admin.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    // ScheduleModule.forRoot(),
    DatabaseModule,
    ResourceModule,
    AdminPageModule,
    StudentModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
