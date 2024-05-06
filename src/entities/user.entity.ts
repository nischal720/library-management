import { Column, Entity, Generated, OneToMany, ManyToMany, OneToOne, JoinColumn, JoinTable } from "typeorm";

import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "src/database/entities/base.entity";
import { RefreshToken } from "./refresh-token.entity";
import { INotificationUser } from "src/common/interface";
import { EnableStatus, Status } from "src/common/enums/all.enum";
import { Notification } from "./notification.entity";
import { Admin } from "./admin.entity";
import { Resource } from "./resources.entity";

@Entity({ name: "users" })
export class User extends BaseEntity implements INotificationUser {

  @Column()
  public name: string;

  @Column({ nullable: false, unique: true })
  public email: string;

  @Column({ nullable: false, unique: true })
  public phone: string;

  @Column({ nullable: false, select: false })
  public password: string;

  // @ApiProperty()
  // @Column({ nullable: false })
  // public type: string;

  @Column({ type: "enum", enum: Status, default: Status.ACTIVE })
  public status: Status;

  @Column({ type: "enum", enum: EnableStatus, default: EnableStatus.Enabled })
  public notificationStatus: EnableStatus;

  @Column({ nullable: true })
  public avatarId: number;

  @OneToOne(() => Resource, (avatar) => avatar.id)
  @JoinColumn({ name: "avatarId" })
  avatar: Resource

  @Column({ name: "reset_token", nullable: false })
  @Generated("uuid")
  public resetToken: string;

  @Column({
    name: "reset_token_expiration",
    nullable: true,
    type: "timestamp",
  })
  public resetTokenExpiration: Date;


  @OneToMany((type) => RefreshToken, (token) => token.user, { lazy: true })
  public refreshTokens: RefreshToken[];

  @OneToMany(() => Notification, (notify) => notify.id)
  notifications: Notification

  public userType = "admin";

  @ManyToMany((type) => Admin, (agent) => agent.followers, { lazy: true })
  public following: Admin[];


}
