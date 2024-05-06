import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminService } from "./admins.service";
import { Admin } from "src/entities/admin.entity";
import { ResourceModule } from "src/modules/resource/resource.module";
import { AdminController } from "./admins.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    // forwardRef(() => EmailerModule),
    forwardRef(() => ResourceModule),
  ],
  controllers: [AdminController],
  exports: [AdminService],
  providers: [AdminService],
})
export class AdminModule { }
