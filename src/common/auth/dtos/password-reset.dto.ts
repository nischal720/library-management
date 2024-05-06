import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class PasswordResetDto {
  @ApiProperty()
  @IsNotEmpty()
  public password: string;

  @ApiProperty()
  @IsNotEmpty()
  public passwordConfirm: string;

  @ApiProperty()
  @IsNotEmpty()
  public code: string;
}
