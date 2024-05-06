import { ApiProperty } from "@nestjs/swagger";
import { Gender, Status, AdminType } from "src/common/enums/all.enum";


export class AdminResponseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty({
    type: "enum",
    enum: AdminType
  })
  type: AdminType;

  @ApiProperty({
    type: "enum",
    enum: Status
  })
  status: Status;

}
