import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/database/entities/base.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Batch extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 50 })
  name: string;
}
