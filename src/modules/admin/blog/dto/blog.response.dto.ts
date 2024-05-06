import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { Status } from "src/common/enums/all.enum";
import { ResourceResponseDto } from "src/modules/resource/dto/resource.response.dto";


export class BlogResponseDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  short_title: string;

  @ApiProperty({ nullable: true })
  description: string;

  @ApiProperty({ nullable: true })
  author: string

  @ApiProperty({ nullable: true })
  publish_date: Date

  @ApiProperty()
  sort: number

  @ApiProperty({ type: ResourceResponseDto })
  @Type(() => ResourceResponseDto)
  feature_image: ResourceResponseDto

  @ApiProperty({ type: ResourceResponseDto })
  @Type(() => ResourceResponseDto)
  cover_image: ResourceResponseDto

  @ApiProperty({
    type: "enum",
    enum: Status
  })
  status: Status;

}
