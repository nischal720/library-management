import {
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsString,
  IsNumber,
  IsDate,
  Length,
} from 'class-validator';
import { AcademicType } from '../entities/student_academic.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentAcademicDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  student_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(AcademicType)
  academic: AcademicType;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  passed_year_en?: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(0, 10)
  passed_year_np?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(0, 20)
  regid?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(0, 20)
  symbol?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(0, 500)
  institute_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(0, 200)
  score: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(0, 200)
  doc?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(0, 200)
  remark: string;
}
