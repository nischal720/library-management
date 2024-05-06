import { ApiProperty } from "@nestjs/swagger";
import { UserDetails } from "./user-details.model";

export class AuthenticatedUser {
  @ApiProperty()
  public accessToken: string;
  @ApiProperty()
  public refreshToken: string;
  @ApiProperty()
  public prefix: string;
  @ApiProperty()
  public expiresIn: string;
  @ApiProperty()
  public userDetails: UserDetails;
}
