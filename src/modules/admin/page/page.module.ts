import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { ResourceModule } from "src/modules/resource/resource.module";
import { Page } from "src/entities/page.entity";
import { PageController } from "./page.controller";
import { PageService } from "./page.service";
import { AdminAuthModule } from "../auth/admin.auth.module";

const passportModule = PassportModule.register({ defaultStrategy: "jwt" });

@Module({
  imports: [
    TypeOrmModule.forFeature([Page]),
    forwardRef(() => AdminAuthModule),
    forwardRef(() => ResourceModule),
    passportModule
  ],
  controllers: [PageController],
  exports: [PageService],
  providers: [PageService],
})
export class PageModule { }
