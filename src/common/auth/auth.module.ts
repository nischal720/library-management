import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { RefreshToken } from "src/entities/refresh-token.entity";
import { RefreshTokensService } from "src/common/auth/services/refresh-tokens.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshToken]),
  ],
  providers: [
    RefreshTokensService,
    // LocalStrategy
  ],
  exports: [RefreshTokensService]
})
export class AuthModule { }
