import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Status, YesNo } from "src/common/enums/all.enum";
import { ResourceDto } from "src/modules/resource/dto/resource.dto";


export class PageUpdateDto {

  @ApiProperty({ type: ResourceDto })
  @IsOptional()
  image: ResourceDto;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  slug: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ required: true, enum: YesNo })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  is_on_footer: YesNo

  @ApiProperty({ required: false })
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
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

