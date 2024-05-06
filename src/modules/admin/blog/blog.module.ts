import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { ResourceModule } from "src/modules/resource/resource.module";
import { Blog } from "src/entities/blog.entity";
import { BlogController } from "./blog.controller";
import { BlogService } from "./blog.service";
import { AdminAuthModule } from "../auth/admin.auth.module";

const passportModule = PassportModule.register({ defaultStrategy: "jwt" });

@Module({
  imports: [
    TypeOrmModule.forFeature([Blog]),
    forwardRef(() => AdminAuthModule),
    forwardRef(() => ResourceModule),
    passportModule
  ],
  controllers: [BlogController],
  exports: [BlogService],
  providers: [BlogService],
})
export class BlogModule { }
