import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "./users.service";
import { User } from "src/entities/user.entity";
import { EmailerModule } from "src/common/services/emailer/emailer.module";
import { ResourceModule } from "src/modules/resource/resource.module";
import { UsersController } from "./users.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => EmailerModule),
    forwardRef(() => ResourceModule),
  ],
  controllers: [UsersController],
  exports: [UsersService],
  providers: [UsersService],
})
export class UsersModule { }
