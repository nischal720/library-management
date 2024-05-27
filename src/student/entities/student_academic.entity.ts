import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/database/entities/base.entity';
import { Entity, Column } from 'typeorm';

export enum AcademicType {
  SLC = 'SLC',
  SEE = 'SEE',
  SCHOOL = 'SCHOOL',
  HSEB = 'HSEB',
  NEB = 'NEB',
  OTHER = 'Other',
}

@Entity('student_academic')
export class StudentAcademic extends BaseEntity {
  @ApiProperty()
  @Column()
  student_id: number;
  @Column({
    type: 'enum',
    enum: AcademicType,
  })
  academic: AcademicType;

  @ApiProperty()
  @Column({ type: 'date', nullable: true })
  passed_year_en: Date;

  @ApiProperty()
  @Column({ type: 'varchar', length: 10, nullable: true })
  passed_year_np: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 20, nullable: true })
  regid: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 20, nullable: true })
  symbol: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 500 })
  institute_name: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 200 })
  score: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 200, nullable: true })
  doc: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 200 })
  remark: string;
}
