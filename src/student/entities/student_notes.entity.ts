import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/database/entities/base.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('student_notes')
export class StudentNote extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  student_id: number;

  @ApiProperty()
  @Column()
  user_id: number;

  @ApiProperty()
  @Column()
  notes: string;
}
