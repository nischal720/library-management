import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { ResourcesController } from "./resource.controller";
import { ResourceService } from "./resource.service";
import { Resource } from "src/entities/resources.entity";
import { ConfigModule } from "@nestjs/config";

// const passportModule = PassportModule.register({ defaultStrategy: "jwt" });

@Module({
  imports: [
    TypeOrmModule.forFeature([Resource]),
    ConfigModule
    // forwardRef(() => AdminAuthModule),
    // passportModule
  ],
  controllers: [ResourcesController],
  exports: [ResourceService],
  providers: [ResourceService],
})
export class ResourceModule { }
