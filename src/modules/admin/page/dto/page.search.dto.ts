import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PageSearch } from "@sksharma72000/nestjs-search-page";
import { Status } from "src/common/enums/all.enum";

export class PageSearchDto {

  @ApiProperty({ type: "boolean" })
  @IsOptional()
  @PageSearch({ is_relational: true })
  image: boolean;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @PageSearch()
  title: string;

  @ApiProperty({
    type: "enum",
    enum: Status,
    required: false,
  })
  @IsString()
  @IsOptional()
  @PageSearch()
  status: Status;

}
