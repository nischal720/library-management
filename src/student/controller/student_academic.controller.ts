import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { StudentAcademicService } from '../service/student_academic.service';
import { CreateStudentAcademicDto } from '../dto/student_academic.dto';
import { StudentAcademic } from '../entities/student_academic.entity';
import { UpdateAcademicDto } from '../dto/updateAcademic.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('student-academic')
@Controller('student-academic')
export class StudentAcademicController {
  constructor(
    private readonly studentAcademicService: StudentAcademicService,
  ) {}

  @ApiResponse({ type: CreateStudentAcademicDto })
  @Post()
  create(@Body() crateAcademicDto: CreateStudentAcademicDto) {
    return this.studentAcademicService.createAcademic(crateAcademicDto);
  }

  @Get()
  findAll() {
    return this.studentAcademicService.findAll();
  }

  @Get(':id')
  findByID(id: number): Promise<StudentAcademic> {
    return this.studentAcademicService.findById(id);
  }

  @Put(':id')
  updateAcademic(
    @Param('id') id: number,
    @Body() updateAcademicDto: UpdateAcademicDto,
  ): Promise<StudentAcademic> {
    return this.studentAcademicService.update(id, updateAcademicDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      throw new BadRequestException('Invalid ID');
    }
    return this.studentAcademicService.deleteAcademic(parsedId);
  }
}
