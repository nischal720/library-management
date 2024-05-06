import { ApiProperty } from "@nestjs/swagger";
import { Page } from "@sksharma72000/nestjs-search-page";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { EnableStatus, Gender, Status, AdminType } from "src/common/enums/all.enum";
import { Admin } from "src/entities/admin.entity";
import { ResourceDto } from "src/modules/resource/dto/resource.dto";


export class AdminPage extends Page<Admin> {
  @ApiProperty({ type: [Admin] })
  public elements: Admin[];
}

export class AdminDto {

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
    enum: AdminType,
    required: true,
  })
  @IsOptional()
  type: AdminType;

  @ApiProperty({
    type: "enum",
    enum: Status,
    required: false,
  })
  @IsOptional()
  status: Status;

}

