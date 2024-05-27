import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsEnum } from 'class-validator';

export enum Relation {
  BROTHER = 'Brother',
  SISTER = 'Sister',
  OTHER = 'Other',
}

export class CreateStudentSiblingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  student1Id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  student2Id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEnum(Relation)
  relation: string;
}

export class UpdateStudentSiblingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  student1Id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  student2Id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEnum(Relation)
  relation: string;
}
