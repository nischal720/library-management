import { Module } from "@nestjs/common";
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { IAuthModuleOptions, PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";

import { RefreshToken } from "src/entities/refresh-token.entity";
import { UsersModule } from "../users/users.module";
import { AuthModule } from "src/common/auth/auth.module";
import { jwtAdminConstants } from "src/common/constants";
import { AdminLocalStrategy } from "./strategies/local.strategy";
import { AdminJwtStrategy } from "./strategies/jwt.strategy";
import { AdminAuthService } from "./admin.auth.service";
import { AdminAuthController } from "./admin.auth.controller";
import { AdminModule } from "../admins/admins.module";

const passportModuleOptions: IAuthModuleOptions = { defaultStrategy: "jwt" };
const jwtModuleOptions: JwtModuleOptions = {
  secret: jwtAdminConstants.secret,
  signOptions: { expiresIn: "1h" },
};

@Module({
  imports: [
    PassportModule.register(passportModuleOptions),
    JwtModule.register(jwtModuleOptions),
    AdminModule,
    AuthModule,
    TypeOrmModule.forFeature([RefreshToken]),
  ],
  providers: [
    AdminAuthService,
    AdminLocalStrategy,
    AdminJwtStrategy
  ],
  exports: [AdminAuthService],
  controllers: [AdminAuthController],
})
export class AdminAuthModule { }
