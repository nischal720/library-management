import { ApiProperty } from "@nestjs/swagger";
import { Status } from "src/common/enums/all.enum";
import { BaseMinEntity } from "src/database/entities/base.min.entity";
import {
    Entity,
    Column,
} from "typeorm";

@Entity()
export class Resource extends BaseMinEntity {
    @ApiProperty()
    @Column({ nullable: false, unique: true, select: false })
    uid: string;

    @Column({ nullable: false })
    url: string; // Stores relative path from application root

    @ApiProperty()
    @Column({ nullable: true })
    type: string;

    @ApiProperty()
    @Column({ nullable: true })
    size: string;

    @ApiProperty()
    @Column({ nullable: true })
    name: string; // Optional original filename

    @ApiProperty()
    @Column({ type: "enum", enum: Status, default: Status.ACTIVE })
    public status: Status;
}
