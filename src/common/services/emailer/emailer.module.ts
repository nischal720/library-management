import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailerService } from './emailer.service';

import * as dotenv from 'dotenv';
dotenv.config();
import { ConfigModule, ConfigService } from '@nestjs/config';
console.log(process.env)
@Module({
  providers: [
    EmailerService,
    ConfigService
  ],
  imports: [
    // DashboardModule,
    ConfigModule,
    MailerModule.forRoot({
      transport: `smtp://${process.env.MAIL_USERNAME}:${process.env.MAIL_PASSWORD}@${process.env.MAIL_HOST}:${process.env.MAIL_PORT}`,
      defaults: {
        from: '"Krishna Acharya" <krishna.rewasoft@gmail.com>',
      },
    })
  ],
  exports: [
    EmailerService
  ]
})

export class EmailerModule { }
