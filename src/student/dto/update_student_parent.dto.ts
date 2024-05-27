import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentToParentDto } from './student_to_parent.dto';

export class UpdateStudentToParentDto extends PartialType(
  CreateStudentToParentDto,
) {}
