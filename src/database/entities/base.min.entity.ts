import { ApiProperty } from "@nestjs/swagger";
import { BeforeInsert, Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseMinEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  id: number;

  // @BeforeInsert()
  // generateCustomPrimaryKey() {
  //   this.id = Generator.getId();
  // }


}
