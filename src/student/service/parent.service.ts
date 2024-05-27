import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateParentDto } from 'src/student/dto/create-parent.dto';
import { UpdateParentDto } from 'src/student/dto/update-parent.dto';
import { Parent } from 'src/student/entities/parent_info.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ParentService {
  constructor(
    @InjectRepository(Parent)
    private parentRepository: Repository<Parent>,
  ) {}

  async createParent(createParentDto: CreateParentDto): Promise<Parent> {
    const parent = this.parentRepository.create(createParentDto);
    return this.parentRepository.save(parent);
  }

  async updateParent(
    id: number,
    updateParentDto: UpdateParentDto,
  ): Promise<Parent> {
    await this.parentRepository.update(id, updateParentDto);
    return this.parentRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async deleteParent(id: number) {
    await this.parentRepository.delete(id);
    return 'Success';
  }

  async findAllParents(): Promise<Parent[]> {
    return this.parentRepository.find();
  }

  async findParentById(id: number): Promise<Parent> {
    return this.parentRepository.findOne({
      where: {
        id: id,
      },
    });
  }
}
