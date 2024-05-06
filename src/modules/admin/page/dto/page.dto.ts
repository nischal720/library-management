import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Status, YesNo } from "src/common/enums/all.enum";
import { Page } from "@sksharma72000/nestjs-search-page";
import { ResourceDto } from "src/modules/resource/dto/resource.dto";
import { PageResponseDto } from "./page.response.dto";
import { Type } from "class-transformer";


export class PagePage extends Page<PageResponseDto> {
  @ApiProperty({ type: [PageResponseDto] })
  public elements: PageResponseDto[];
}

export class PageDto {

  @ApiProperty({ type: ResourceDto })
  @IsOptional()
  image: ResourceDto;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ required: false, enum: YesNo })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  is_on_footer: YesNo

  @ApiProperty({ required: false })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  sort: number

  @ApiProperty({
    type: "enum",
    enum: Status,
    required: false,
  })
  @IsString()
  @IsOptional()
  status: Status;

}

