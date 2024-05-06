import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { RefreshToken } from "src/entities/refresh-token.entity";
import { AdminService } from "../admins/admins.service";
import { RefreshTokensService } from "src/common/auth/services/refresh-tokens.service";
import { AuthenticatedUser } from "src/common/auth/models/authenticated-user.model";
import { UserDetails } from "src/common/auth/models/user-details.model";
import { Admin } from "src/entities/admin.entity";

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly userService: AdminService,
    private readonly jwtService: JwtService,
    private readonly refreshTokensService: RefreshTokensService
  ) { }

  public async validateUser(username: string, password: string): Promise<any> {
    const user: Admin = await this.userService.findByEmailPhone(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, resetToken, ...result } = user;
      console.log(result)
      return result;
    }
    return null;
  }

  public async login(user: Admin): Promise<AuthenticatedUser> {
    return this._generateAuthenticatedUser(user);
  }

  public async refreshToken(
    accessToken: string,
    refreshToken: string
  ): Promise<AuthenticatedUser> {
    const tokenPayload: any = this.jwtService.decode(accessToken);
    const tokenInDb: RefreshToken =
      await this.refreshTokensService.findAdminByRefreshTokenAndUserId(
        refreshToken,
        tokenPayload.sub
      );
    const user: Admin = await this.userService.findByEmail(tokenPayload.email);
        console.log(user)
    if (!tokenInDb || !user || tokenInDb.isBlacklisted) {
      throw new BadRequestException("Unable to refresh token");
    }

    return this._generateAuthenticatedUser(user);
  }

  private async _generateAuthenticatedUser(
    user: Admin
  ): Promise<AuthenticatedUser> {
    const expiresIn: string = "5d";
    return {
      accessToken: await this._getAccessToken(user, expiresIn),
      refreshToken: await this._getRefreshToken(user),
      prefix: "Bearer",
      expiresIn: expiresIn,
      userDetails: await this._getUserDetails(user),
    } as AuthenticatedUser;
  }

  private async _getAccessToken(
    user: Admin,
    expiresIn: string
  ): Promise<string> {
    const payload = {
      email: user.email,
      sub: user.id,
    };
    return this.jwtService.sign(payload, { expiresIn: expiresIn });
  }

  private async _getRefreshToken(user: Admin): Promise<string> {
    console.log(user)

    let refreshToken: RefreshToken =
      await this.refreshTokensService.findAdminNonBlacklistedByUserId(user.id);
    if (!refreshToken) {
      refreshToken = await this.refreshTokensService.createNewAdminRefreshToken(
        user.id
      );
    }
    return refreshToken.refreshToken;
  }

  private async _getUserDetails(user: Admin): Promise<UserDetails> {
    return {
      id: user.id,
      email: user.email,
      username: user.name,
    } as UserDetails;
  }
}
