import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/database/entities/base.entity';
import { StudentToParent } from './student-parent-relation.entity';
import { ApiProperty } from '@nestjs/swagger';
import { BloodGroup, Gender } from 'src/common/enums/all.enum';

@Entity('parents')
export class Parent extends BaseEntity {
  @ApiProperty()
  @Column({ length: 200 })
  firstName: string;

  @ApiProperty()
  @Column({ length: 200 })
  lastName: string;

  @ApiProperty()
  @Column({ length: 200, nullable: true })
  occupation: string;

  @ApiProperty()
  @Column({ length: 10, unique: true })
  phone: string;

  @ApiProperty()
  @Column({ length: 200, nullable: true })
  address1: string;

  @ApiProperty()
  @Column({ length: 200, nullable: true })
  address2: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: BloodGroup,
    nullable: true,
  })
  bloodGroup: string;

  @ApiProperty()
  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender: string;

  @ApiProperty()
  @Column({ length: 200, nullable: true })
  email: string;


  @Column({ length: 200, nullable: true })
  img: string;

  @OneToMany(() => StudentToParent, (relation) => relation.relation)
  studentRelations: StudentToParent;
}
