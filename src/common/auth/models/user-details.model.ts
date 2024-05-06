import { ApiProperty } from "@nestjs/swagger";

export class UserDetails {
  @ApiProperty()
  public id: number;
  @ApiProperty()
  public email: string;
  @ApiProperty()
  public username: string;
}
