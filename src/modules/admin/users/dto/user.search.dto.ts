import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";
import { PageSearch } from "@sksharma72000/nestjs-search-page";
import { Status, UserType } from "src/common/enums/all.enum";
import { Type } from "class-transformer";

export class UserSearchDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @PageSearch({ operator: "and", operation: "eq" })
  id: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Boolean)
  @PageSearch({ is_relational: true })
  avatar: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @PageSearch()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @PageSearch()
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @PageSearch()
  phone: string;

  @ApiProperty({
    type: "enum",
    enum: UserType,
    required: false,
  })
  @IsOptional()
  @PageSearch()
  type: UserType;

  @ApiProperty({
    type: "enum",
    enum: Status,
    required: false,
  })
  @IsOptional()
  @PageSearch()
  status: Status;

}
