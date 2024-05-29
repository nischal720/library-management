import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/database/entities/base.entity';
import { Resource } from 'src/entities/resources.entity';
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { StudentDocEnum } from '../dto/student_doc.dto';

@Entity({ name: 'student_documents' })
export class StudentDocuemnt extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'int' })
  student_id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 200, nullable: true })
  remark: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: StudentDocEnum,
  })
  type: string;

  @ApiProperty()
  @Column({ type: 'int', nullable: true })
  doc_Id: number;

  @OneToOne(() => Resource)
  @JoinColumn({ name: 'doc_Id' })
  doc: Resource;
}
