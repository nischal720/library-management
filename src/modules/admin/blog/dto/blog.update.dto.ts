import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Status } from "src/common/enums/all.enum";
import { ResourceDto } from "src/modules/resource/dto/resource.dto";


export class BlogUpdateDto {

  @ApiProperty({ type: ResourceDto })
  @IsOptional()
  feature_image: ResourceDto;

  @ApiProperty({ type: ResourceDto })
  @IsOptional()
  cover_image: ResourceDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  short_title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  slug: string;

  @ApiProperty()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  author: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  publish_date: Date;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsOptional()
  @Type(() => Number)
  sort: number
  

  @ApiProperty({
    type: "enum",
    enum: Status,
    required: false,
  })
  @IsOptional()
  status: Status;

}

