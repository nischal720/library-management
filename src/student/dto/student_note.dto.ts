import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentNoteDto {
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsInt()
  student_id: number;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsInt()
  user_id: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  notes: string;
}

export class StudentNoteResponse {
  id: number;
  student_id: number;
  user_id: number;
  notes: string;
}

export class UpdateNoteDto extends PartialType(CreateStudentNoteDto) {}
