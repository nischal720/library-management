import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtAdminConstants } from "src/common/constants";

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, "admin-jwt") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtAdminConstants.secret,
    });
  }

  public async validate(payload: any): Promise<any> {
    // @@@ Can further validate here
    return {
      userId: payload.sub,
      username: payload.username,
      roles: payload.roles,
    };
  }
}
