import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { YesNo } from 'src/common/enums/all.enum';

export class CreateStudentAttendanceDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  student_id: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  log_id: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  period_id: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  class_id: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  lecture_id?: number;

  @ApiProperty()
  @IsNotEmpty()
  date_en: Date;

  @ApiProperty()
  @IsString()
  @MaxLength(10)
  date_np: string;

  @ApiProperty()
  @IsEnum(YesNo)
  @IsNotEmpty()
  present: 'Yes' | 'No';

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  remark?: string;
}

export class UpdateStudentAttendanceDto extends PartialType(
  CreateStudentAttendanceDto,
) {}

export class StudentAttendanceResponseDto {
  student_id: number;
  log_id: number;
  period_id: number;
  class_id: number;
  lecture_id?: number;
  dateEn: Date;
  dateNp: string;
  present: 'Yes' | 'No';
  remark?: string;
}
