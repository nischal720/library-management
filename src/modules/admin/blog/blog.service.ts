import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { findAllByPage, Page } from "@sksharma72000/nestjs-search-page";
import { ResourceService } from "../../resource/resource.service";
import { PageDto } from "src/common/dto/page.dto";
import { Blog } from "src/entities/blog.entity";
import { BlogDto } from "./dto/blog.dto";
import { BlogSearchDto } from "./dto/blog.search.dto";
import { BlogUpdateDto } from "./dto/blog.update.dto";

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepo: Repository<Blog>,
    private readonly resourceService: ResourceService
  ) {
  }

  async add(serviceDto: BlogDto): Promise<Blog> {
    let { feature_image, cover_image, ...blogLis } = serviceDto
    const filename1 = await this.resourceService.upload(feature_image)
    const filename2 = await this.resourceService.upload(cover_image)
    const blogCreate = {
      ...blogLis,
      feature_id: filename1.id,
      cover_id: filename2.id
    }
    return await this.blogRepo.save(blogCreate);
  }

  async getAll(
    pageable: PageDto,
    blogSearchDto: BlogSearchDto
  ): Promise<Page<Blog>> {
    return findAllByPage({ repo: this.blogRepo, page: pageable, queryDto: blogSearchDto });
  }


  async getByIds(serviceIds: Array<number>): Promise<Blog[]> {
    const blog = await this.blogRepo.find({
      where: { id: In(serviceIds) },
      order: {
        id: "DESC",
      },
      relations: { cover_image: true, feature_image: true }
    });
    return blog;
  }

  async getById(id: number): Promise<Blog> {
    const service = await this.blogRepo.findOne({
      where: {
        id: id,
      },
      relations: { cover_image: true, feature_image: true }
    });
    if (!service) {
      throw new NotFoundException();
    }
    return service;
  }

  async update(id: number, serviceDto: BlogUpdateDto): Promise<Blog> {
    const serviceUpdate = await this.getById(id);
    const newupdate = await this.updateProperties(serviceUpdate, serviceDto);
    return this.blogRepo.save(newupdate);
  }


  private async updateProperties(modalToUpdate: Blog, serviceDto: BlogUpdateDto) {

    const { feature_image, cover_image, ...blogLis } = serviceDto

    if (feature_image && "uid" in feature_image) {
      const filename = await this.resourceService.upload(feature_image)
      modalToUpdate.feature_id = filename.id;
      delete modalToUpdate.feature_image
    }
    if (cover_image && "uid" in cover_image) {
      const filename = await this.resourceService.upload(cover_image)
      modalToUpdate.cover_id = filename.id;
      delete modalToUpdate.cover_image
    }
    return {
      ...modalToUpdate,
      ...blogLis
    }
  }

  async getCount(): Promise<Number> {
    return await this.blogRepo.count();
  }
}
