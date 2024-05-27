import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsEnum } from 'class-validator';

export class CreateStudentToParentDto {
  @ApiProperty()
  @IsInt()
  student_id: number;

  @ApiProperty()
  @IsInt()
  parent_id: number;

  @ApiProperty()
  @IsString()
  relation: string;

  @ApiProperty()
  @IsEnum(['yes', 'no'])
  isGuardian: 'yes' | 'no';
}
