import { CreateStudentAcademicDto } from './student_academic.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateAcademicDto extends PartialType(CreateStudentAcademicDto) {}
