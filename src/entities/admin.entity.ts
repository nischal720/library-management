import { Column, Entity, Generated, OneToMany, ManyToMany, JoinTable,OneToOne,JoinColumn } from "typeorm";

import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "src/database/entities/base.entity";
import { RefreshToken } from "./refresh-token.entity";
import { INotificationUser } from "src/common/interface";
import { EnableStatus, Status } from "src/common/enums/all.enum";
import { Notification } from "./notification.entity";
import { User } from "./user.entity";
import { Resource } from "./resources.entity";

@Entity({ name: "admins" })
export class Admin extends BaseEntity implements INotificationUser {

  @ApiProperty()
  @Column()
  public name: string;

  @ApiProperty()
  @Column({ nullable: false, unique: true })
  public email: string;

  @ApiProperty()
  @Column({ nullable: false, unique: true })
  public phone: string;

  @ApiProperty()
  @Column({ nullable: false, select: false })
  public password: string;

  @ApiProperty()
  @Column()
  public type: string;

  @Column({ type: "enum", enum: Status, default: Status.ACTIVE })
  public status: Status;

  @ApiProperty()
  @Column({ type: "enum", enum: EnableStatus, default: EnableStatus.Enabled })
  public notificationStatus: EnableStatus;

  @ApiProperty()
  @Column({ name: "reset_token", nullable: false })
  @Generated("uuid")
  public resetToken: string;

  @ApiProperty({ type: Date })
  @Column({
    name: "reset_token_expiration",
    nullable: true,
    type: "timestamp",
  })
  public resetTokenExpiration: Date;

  @ApiProperty({ type: [RefreshToken] })
  @OneToMany((type) => RefreshToken, (token) => token.admin_id, { lazy: true })
  public refreshTokens: RefreshToken[];

  @ApiProperty()
  @OneToMany(() => Notification, (notify) => notify.id)
  notifications: Notification


  @Column({ nullable: true })
  public avatarId: number;

  @OneToOne(() => Resource, (avatar) => avatar.id)
  @JoinColumn({ name: "avatarId" })
  avatar: Resource

  public userType = "admin";

  @ManyToMany((type) => User, (user) => user.id, { lazy: true })
  @JoinTable({ name: "agent_followers" })
  public followers: User[];

}
