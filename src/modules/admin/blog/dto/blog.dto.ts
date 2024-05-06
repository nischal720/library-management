import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Status } from "src/common/enums/all.enum";
import { ResourceDto } from "src/modules/resource/dto/resource.dto";
import { BlogResponseDto } from "./blog.response.dto";
import { Type } from "class-transformer";
import { Page } from "@sksharma72000/nestjs-search-page";


export class BlogPage extends Page<BlogResponseDto> {
  @ApiProperty({ type: [BlogResponseDto] })
  public elements: BlogResponseDto[];
}

export class BlogDto {

  @ApiProperty({ type: ResourceDto, required: true })
  feature_image: ResourceDto;

  @ApiProperty({ type: ResourceDto, required: true })
  cover_image: ResourceDto;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  short_title: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  slug: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  author: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  publish_date: Date;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @Type(() => Number)
  sort: number

  @ApiProperty({
    type: "enum",
    enum: Status,
    required: false,
    description: "This is optional and default value is Active"
  })
  @IsOptional()
  status: Status;

}

