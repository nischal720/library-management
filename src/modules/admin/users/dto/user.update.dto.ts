import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { EnableStatus, Gender, Status, UserType } from "src/common/enums/all.enum";
import { ResourceDto } from "src/modules/resource/dto/resource.dto";

export class UserUpdateDto {

  @ApiProperty({ required: true })
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: "enum", enum: EnableStatus, required: true })
  @IsOptional()
  @IsNotEmpty()
  notificationStatus: EnableStatus;

  @ApiProperty({ type: ResourceDto })
  @IsNotEmpty({ message: "Avatar cannot be empty" })
  @IsOptional()
  avatar: ResourceDto;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsOptional()
  email: string;

  @ApiProperty({ required: true })
  @IsOptional()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsOptional()
  phone: string;

  @ApiProperty({
    type: "enum",
    enum: UserType,
    required: true,
  })
  @IsOptional()
  type: UserType;

  @ApiProperty({
    type: "enum",
    enum: Status,
    required: false,
  })
  @IsOptional()
  status: Status;

}

