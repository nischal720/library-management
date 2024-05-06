import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, ArrayNotEmpty, ValidateNested, IsOptional, IsString } from "class-validator";
import { Status } from "src/common/enums/all.enum";
import { Resource } from "src/entities/resources.entity";
import { Page } from "@sksharma72000/nestjs-search-page";


export class ResourcePage extends Page<Resource> {
  @ApiProperty({ type: [Resource] })
  public elements: Resource[];
}

export class ResourceDto {

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

