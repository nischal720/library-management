import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateParentDto } from 'src/student/dto/create-parent.dto';
import { UpdateParentDto } from 'src/student/dto/update-parent.dto';
import { ParentService } from 'src/student/service/parent.service';

@ApiTags('parents')
@Controller('parents')
export class ParentController {
  constructor(private readonly parentService: ParentService) {}
  @ApiResponse({
    type: CreateParentDto,
  })
  @Post('/')
  create(@Body() createParentDto: CreateParentDto) {
    return this.parentService.createParent(createParentDto);
  }

  @Get('/')
  findAll() {
    return this.parentService.findAllParents();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.parentService.findParentById(+id);
  }

  @Put(':id')
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateParentDto: UpdateParentDto) {
    return this.parentService.updateParent(+id, updateParentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.parentService.deleteParent(+id);
  }
}
