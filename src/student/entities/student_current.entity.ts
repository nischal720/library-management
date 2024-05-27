// student-current.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { BaseEntity } from 'src/database/entities/base.entity';
import { Entity, Column } from 'typeorm';
import { STATE } from '../dto/create_student_current.dto';

export enum StudentState {
  CURRENT = 'Current',
  DROP = 'Drop',
  ALUMNI = 'Alumni',
}

@Entity()
export class StudentCurrent extends BaseEntity {
  @ApiProperty()
  @Column()
  student_id: number;

  @ApiProperty()
  @Column()
  class_id: number;

  @ApiProperty()
  @Column()
  batch_id: number;

  @ApiProperty()
  @Column({ type: 'int', nullable: true })
  section_id: number;

  @ApiProperty()
  @IsOptional()
  @Column({ type: 'int', nullable: true })
  house_id: number;

  @ApiProperty()
  @IsOptional()
  @Column({ type: 'int', nullable: true })
  hostel_id: number;

  @ApiProperty()
  @Column({ type: 'int' })
  user_id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 20, nullable: true })
  roll_no: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 20, nullable: true })
  symbol: string;

  @ApiProperty()
  @IsOptional()
  @Column({
    type: 'enum',
    enum: STATE,
    default: 'Current',
  })
  state: 'Current' | 'Drop' | 'Alumni';
}
