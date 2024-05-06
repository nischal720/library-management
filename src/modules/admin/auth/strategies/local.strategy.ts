import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AdminAuthService } from "../admin.auth.service";

@Injectable()
export class AdminLocalStrategy extends PassportStrategy(Strategy, 'admin-auth') {
  constructor(private authService: AdminAuthService) {
    super();
  }

  public async validate(username: string, password: string): Promise<any> {
    console.log("from admin")
    const user = await this.authService.validateUser(
      username,
      password
    );
    if (!user) {
      throw new UnauthorizedException("Invalid username/password");
    }
    return user;
  }
}
