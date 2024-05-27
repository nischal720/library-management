import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentToParentService } from '../service/student_parent_relation.service';
import { CreateStudentToParentDto } from '../dto/student_to_parent.dto';
import { UpdateStudentToParentDto } from '../dto/update_student_parent.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('student-parent')
@Controller('student-parent')
export class StudentToParentController {
  constructor(
    private readonly studentToParentService: StudentToParentService,
  ) {}
  @ApiResponse({ type: UpdateStudentToParentDto })
  @Post()
  create(@Body() createStudentToParentDto: CreateStudentToParentDto) {
    return this.studentToParentService.create(createStudentToParentDto);
  }

  @Get()
  findAll() {
    return this.studentToParentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentToParentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudentToParentDto: UpdateStudentToParentDto,
  ) {
    return this.studentToParentService.update(+id, updateStudentToParentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentToParentService.remove(+id);
  }
}
