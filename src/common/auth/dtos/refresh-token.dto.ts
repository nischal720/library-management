import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class RefreshTokenDto {
  @ApiProperty()
  @IsNotEmpty()
  public accessToken: string;

  @ApiProperty()
  @IsNotEmpty()
  public refreshToken: string;
}
