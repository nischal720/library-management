import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { Status, YesNo } from "src/common/enums/all.enum";
import { ResourceResponseDto } from "src/modules/resource/dto/resource.response.dto";


export class PageResponseDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  slug: string;

  @ApiProperty({ nullable: true })
  description: string;

  @ApiProperty({ nullable: true, enum: YesNo })
  is_on_footer: YesNo

  @ApiProperty()
  sort: number

  @ApiProperty({ type: ResourceResponseDto })
  @Type(() => ResourceResponseDto)
  image: ResourceResponseDto

  @ApiProperty({
    type: "enum",
    enum: Status
  })
  status: Status;

}
