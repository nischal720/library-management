import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RefreshToken } from "src/entities/refresh-token.entity";
import { Repository } from "typeorm";
import { v4 as uuid } from "uuid";

@Injectable()
export class RefreshTokensService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>
  ) { }

  public async findAdminByRefreshTokenAndUserId(
    refreshToken: string,
    userId: number
  ): Promise<RefreshToken> {
    return this.refreshTokenRepository.findOne({
      where: {
        refreshToken: refreshToken,
        user_id: userId,
      },
    });
  }

  public async findAdminNonBlacklistedByUserId(
    userId: number
  ): Promise<RefreshToken> {
    return this.refreshTokenRepository.findOne({
      where: {
        isBlacklisted: false,
        user_id: userId
      },
    });
  }

  public async createNewAdminRefreshToken(userId: number): Promise<RefreshToken> {
    const refreshToken: RefreshToken = this.refreshTokenRepository.create({
      refreshToken: uuid(),
      admin_id: userId,
    });
    return this.refreshTokenRepository.save(refreshToken);
  }


  public async findUserByRefreshTokenAndUserId(
    refreshToken: string,
    userId: number
  ): Promise<RefreshToken> {
    return this.refreshTokenRepository.findOne({
      where: {
        refreshToken: refreshToken,
        admin_id: userId,
      },
    });
  }

  public async findUserNonBlacklistedByUserId(
    userId: number
  ): Promise<RefreshToken> {
    return this.refreshTokenRepository.findOne({
      where: {
        isBlacklisted: false,
        admin_id: userId,
      },
    });
  }

  public async createNewUserRefreshToken(userId: number): Promise<RefreshToken> {
    const refreshToken: RefreshToken = this.refreshTokenRepository.create({
      refreshToken: uuid(),
      admin_id: userId,
    });
    return this.refreshTokenRepository.save(refreshToken);
  }


}
