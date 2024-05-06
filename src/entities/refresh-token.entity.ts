import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { User } from "src/entities/user.entity";
import { BaseEntity } from "src/database/entities/base.entity";
import { Admin } from "./admin.entity";

@Entity()
export class RefreshToken extends BaseEntity {
  @Column("integer", { nullable: true })
  public user_id: number;

  @Column("integer", { nullable: true })
  public admin_id: number;

  @Column({ nullable: false, name: "refresh_token" })
  public refreshToken: string;

  @Column({ nullable: false, name: "is_blacklisted", default: false })
  public isBlacklisted: boolean;

  @ManyToOne((type) => User, (user) => user.id, {
    onDelete: "CASCADE",
    lazy: true,
  })
  @JoinColumn({ name: "user_id" })
  public user: () => User;

  @ManyToOne((type) => Admin, (user) => user.id, {
    onDelete: "CASCADE",
    lazy: true,
  })
  @JoinColumn({ name: "admin_id" })
  public admin: () => Admin;
}
