import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateParentDto } from 'src/student/dto/create-parent.dto';
import { UpdateParentDto } from 'src/student/dto/update-parent.dto';
import { Parent } from 'src/student/entities/parent_info.entity';
import { Repository, DeepPartial } from 'typeorm';
import { StudentFile } from '../entities/file.entity';
import { Resource } from 'src/entities/resources.entity';

@Injectable()
export class ParentService {
  constructor(
    @InjectRepository(Parent)
    private parentRepository: Repository<Parent>,
    @InjectRepository(StudentFile)
    private readonly studentFileRepository: Repository<StudentFile>,
  ) {}

  async createParent(createParentDto: CreateParentDto): Promise<Parent> {
    let { img, ...parentDetails } = createParentDto;

    const resource: DeepPartial<Resource> = { name: img.name };
    const saveImg = await this.studentFileRepository.save(resource);
    const createParentDoc = {
      ...parentDetails,
      imgId: saveImg.id,
    };

    const parent = await this.parentRepository.create(createParentDoc);
    return this.parentRepository.save(parent);
  }

  async updateParent(
    id: number,
    updateParentDto: UpdateParentDto,
  ): Promise<Parent> {
    const { img, ...parentDetails } = updateParentDto;

    if (img) {
      const resource: DeepPartial<Resource> = { name: img.name };
      const saveImg = await this.studentFileRepository.save(resource);
      parentDetails.imgId = saveImg.id;
    }

    await this.parentRepository.update(id, parentDetails);
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
