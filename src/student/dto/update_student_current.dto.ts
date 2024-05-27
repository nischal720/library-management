import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentCurrentDto } from './create_student_current.dto';

export class UpdateStudentCurrentDTO extends PartialType(
  CreateStudentCurrentDto,
) {}
