import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class PasswordRequestResetDto {
  @ApiProperty({ example: "sksharma72000@gmail.com" })
  @IsNotEmpty()
  public email: string;
}
