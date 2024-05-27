import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  Put,
} from '@nestjs/common';
import { StudentSiblingService } from '../service/srudent_sibling.service';
import {
  CreateStudentSiblingDto,
  UpdateStudentSiblingDto,
} from '../dto/create-student-sibling.dto';
import { StudentSibling } from '../entities/student_sibling.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('student-sibling')
@Controller('student-sibling')
export class StudentSiblingController {
  constructor(private readonly studentSiblingService: StudentSiblingService) {}

  @ApiResponse({ type: UpdateStudentSiblingDto })
  @Post()
  async createSibling(
    @Body() createSiblingDto: CreateStudentSiblingDto,
  ): Promise<StudentSibling> {
    return this.studentSiblingService.createSiblingRelation(createSiblingDto);
  }

  @Get('student/:studentId')
  async getSiblingsByStudentId(
    @Param('studentId') studentId: number,
  ): Promise<StudentSibling[]> {
    return this.studentSiblingService.getSiblingsByStudentId(studentId);
  }

  @Get(':id')
  async getSiblingById(@Param('id') id: number): Promise<StudentSibling> {
    return this.studentSiblingService.getSiblingById(id);
  }

  @Get()
  async getAllSiblingRelations(): Promise<StudentSibling[]> {
    return this.studentSiblingService.getAllSiblingRelations();
  }

  @Delete(':id')
  async deleteSibling(@Param('id') id: number) {
    return this.studentSiblingService.deleteSiblingRelation(id);
  }

  @Put()
  async updateSibling(
    @Body() updateSiblingDto: UpdateStudentSiblingDto,
  ): Promise<StudentSibling> {
    return this.studentSiblingService.updateSiblingRelation(updateSiblingDto);
  }
}
