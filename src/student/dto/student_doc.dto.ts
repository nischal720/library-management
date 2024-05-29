import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ResourceDto } from 'src/modules/resource/dto/resource.dto';
import { PrimaryGeneratedColumn } from 'typeorm';

export enum StudentDocEnum {
  CTZ = 'Citizenship',
  BIRTH_CIRTIFICATE = 'Birth_Certificate',
  DRIVING_LICENCE = 'Driving_Licence',
}

export class SudentDocDto {
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty()
  @IsNotEmpty()
  student_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(StudentDocEnum)
  type: string;

  @ApiProperty()
  remark: string;
  @ApiProperty()
  doc_Id: number;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  doc: ResourceDto;
}

export class UpdateStudentDoc extends PartialType(SudentDocDto) {}
