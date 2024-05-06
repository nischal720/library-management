import { ApiProperty } from "@nestjs/swagger";
import { BeforeInsert, BeforeUpdate, Column } from "typeorm";
import { BaseMinEntity } from "./base.min.entity";

export abstract class BaseEntity extends BaseMinEntity {
  @ApiProperty({ type: Date })
  @Column({ name: "created_at", default: () => "CURRENT_TIMESTAMP", type: "timestamp" })
  public createdAt: Date;

  @ApiProperty({ type: Date })
  @Column({ name: "updated_at", default: () => "CURRENT_TIMESTAMP", type: "timestamp" })
  public updatedAt: Date;

  // @ApiProperty({ type: Date })
  // @Column({ name: "deleted_at", nullable: true, type: "timestamp" })
  // public deletedAt: Date;


  // @BeforeInsert()
  public superBeforeInsert() {
    // const now: Date = new Date();
    // this.createdAt = now;
    // this.updatedAt = now;
  }

  @BeforeUpdate()
  public superBeforeUpdate() {
    const now: Date = new Date();
    this.updatedAt = now;
  }
}
