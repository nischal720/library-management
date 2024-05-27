import { ApiProperty } from '@nestjs/swagger';
import { YesNo } from 'src/common/enums/all.enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('student_attendance')
export class StudentAttendance {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  student_id: number;

  @ApiProperty()
  @Column()
  log_id: number;

  @ApiProperty()
  @Column()
  period_id: number;

  @ApiProperty()
  @Column()
  class_id: number;

  @ApiProperty()
  @Column({ nullable: true })
  lecture_id: number;

  @ApiProperty()
  @Column()
  date_en: Date;

  @ApiProperty()
  @Column({ type: 'char', length: 10 })
  date_np: string;

  @ApiProperty()
  @Column({ type: 'enum', enum: YesNo })
  present: 'Yes' | 'No';

  @ApiProperty()
  @Column({ type: 'varchar', length: 500, nullable: true })
  remark: string;
}
