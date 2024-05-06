import { Entity, Column } from 'typeorm';
import { Status, YesNo } from 'src/common/enums/all.enum';
import { BaseEntity } from 'src/database/entities/base.entity';

@Entity({ name: 'contacts' })
export class Contact extends BaseEntity {

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({ nullable: true, default: null })
    phone: string;

    @Column({ nullable: true, default: null })
    description: string;

    @Column({ type: "enum", enum: YesNo, default: YesNo.No })
    public read: YesNo;

    @Column({ type: "enum", enum: Status, default: Status.ACTIVE })
    public status: Status;

}