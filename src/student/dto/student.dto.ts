import { Page } from '@sksharma72000/nestjs-search-page';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { User } from 'src/entities/user.entity';
import { OneToOne, JoinColumn } from 'typeorm';
import { StudentresponseDto } from './student_response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { BloodGroup, Gender, Status } from 'src/common/enums/all.enum';
import { ResourceDto } from 'src/modules/resource/dto/resource.dto';

export class StudentPage extends Page<StudentresponseDto> {
  public elements: StudentresponseDto[];
}
export class CreateStudentDto {
  @ApiProperty()
  @IsNotEmpty()
  uni_reg?: string;

  @ApiProperty()
  @IsOptional()
  regid?: string;

  @ApiProperty()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: 'Male' | 'Female' | 'Other';

  @ApiProperty({ type: Date })
  @IsNotEmpty()
  admission_date_np: string;

  @ApiProperty({ type: Date })
  @IsOptional()
  admission_date_en: Date;

  @ApiProperty({ type: Date })
  @IsNotEmpty()
  dob_np: string;

  @ApiProperty({ type: Date })
  @IsOptional()
  dob_en: Date;

  @ApiProperty()
  @IsOptional()
  phone1?: string;

  @ApiProperty()
  @IsOptional()
  phone2?: string;

  @ApiProperty()
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsEnum(BloodGroup)
  @IsOptional()
  blood_group: string;

  @ApiProperty()
  @IsNotEmpty()
  nationality: string;

  @ApiProperty()
  @IsOptional()
  religion: string;

  @ApiProperty()
  @IsOptional()
  cast: string;

  @ApiProperty()
  @IsOptional()
  ethnic: string;
  @IsOptional()
  @ApiProperty()
  disability: string;

  @ApiProperty()
  @IsNotEmpty()
  address1: string;
  address2?: string;

  @IsOptional()
  imgId: number;

  @ApiProperty()
  @IsOptional()
  img?: ResourceDto;

  @ApiProperty()
  @IsOptional()
  user: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Status)
  status: 'Active' | 'Inactive';

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;
}
