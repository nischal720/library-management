import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/database/entities/base.entity';
import { Column, Entity } from 'typeorm';
import { STATE } from '../dto/create_student_current.dto';
@Entity()
export class StudentLog extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'int' })
  student_id: number;

  @ApiProperty()
  @Column({ type: 'int' })
  class_id: number;

  @ApiProperty()
  @Column({ type: 'int' })
  batch_id: number;

  @ApiProperty()
  @Column({ type: 'int', nullable: true })
  section_id: number;

  @ApiProperty()
  @Column({ type: 'int', nullable: true })
  house_id: number;

  @ApiProperty()
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
  @Column({
    type: 'enum',
    enum: STATE,
    default: 'Current',
  })
  state: 'Current' | 'Drop' | 'Alumni';
}
