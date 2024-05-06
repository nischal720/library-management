import { ApiProperty } from "@nestjs/swagger";
import { Gender, Status, UserType } from "src/common/enums/all.enum";


export class UserResponseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty({
    type: "enum",
    enum: UserType
  })
  type: UserType;

  @ApiProperty({
    type: "enum",
    enum: Status
  })
  status: Status;

}
