import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export enum STATE {
  CURRENT = 'Current',
  DROP = 'Drop',
  ALUMNI = 'Alumni',
}

export class CreateStudentCurrentDto {
  @ApiProperty()
  @IsInt()
  student_id: number;

  @ApiProperty()
  @IsInt()
  class_id: number;

  @ApiProperty()
  @IsInt()
  batch_id: number;

  @ApiProperty()
  @IsInt()
  section_id?: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  house_id?: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  hostel_id?: number;

  @ApiProperty()
  @IsInt()
  user_id: number;

  @ApiProperty()
  @IsString()
  @MaxLength(3)
  roll_no?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(20)
  symbol?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(STATE)
  state?: 'Current' | 'Drop' | 'Alumni';
}
