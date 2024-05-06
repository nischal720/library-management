import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { PageSearch } from "@sksharma72000/nestjs-search-page";
import { Status } from "src/common/enums/all.enum";

export class BlogSearchDto {

  @ApiProperty({ type: "boolean" })
  @IsOptional()
  @PageSearch({ is_relational: true })
  feature_image: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @PageSearch()
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @PageSearch({ column: "seo.keywords"})
  seo_key: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @PageSearch()
  short_title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @PageSearch()
  author: string;

  @ApiProperty({
    type: "enum",
    enum: Status,
    required: false,
  })
  @IsOptional()
  @PageSearch({ operation: "eq", operator: "and" })
  status: Status;

}
