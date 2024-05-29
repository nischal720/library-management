import { IsString, IsOptional, IsEnum, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BloodGroup, Gender } from 'src/common/enums/all.enum';
import { ResourceDto } from 'src/modules/resource/dto/resource.dto';

export class CreateParentDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  occupation?: string;

  @ApiProperty()
  @IsString()
  phone: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  address1?: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  address2?: string;
  @ApiProperty()
  @IsOptional()
  @IsEnum(BloodGroup)
  bloodGroup?: BloodGroup;
  @ApiProperty()
  @IsOptional()
  imgId: number;
  @ApiProperty()
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;
  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email?: string;
  @ApiProperty()
  @IsOptional()
  @ApiProperty()
  img: ResourceDto;
}
