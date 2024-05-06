import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";


export class ResourceResponseDto {
  @ApiProperty()
  uid: string

  @ApiProperty()
  name: string

  @ApiProperty()
  url: string

  @ApiProperty()
  type: string

  @ApiProperty()
  size: string

}

