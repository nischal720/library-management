import { ApiProperty } from "@nestjs/swagger";
import { Page } from "@sksharma72000/nestjs-search-page";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { EnableStatus, Gender, Status, UserType } from "src/common/enums/all.enum";
import { User } from "src/entities/user.entity";
import { ResourceDto } from "src/modules/resource/dto/resource.dto";


export class UserPage extends Page<User> {
  @ApiProperty({ type: [User] })
  public elements: User[];
}

export class UserDto {

  @ApiProperty({ required: true })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: "enum", enum: EnableStatus, required: true })
  @IsNotEmpty()
  notificationStatus: EnableStatus;

  @ApiProperty({ type: ResourceDto })
  @IsOptional()
  // @IsNotEmpty({ message: "Avatar cannot be empty" })
  avatar: ResourceDto;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
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

