import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Status } from "src/common/enums/all.enum";
import { In, Repository } from "typeorm";
import { findAllByPage, Page as SearchPage } from "@sksharma72000/nestjs-search-page";
import { ResourceService } from "src/modules/resource/resource.service";
import { PageDto as PagableDto } from "src/common/dto/page.dto";
import { Page } from "src/entities/page.entity";
import { PageDto } from "./dto/page.dto";
import { PageSearchDto } from "./dto/page.search.dto";
import { PageUpdateDto } from "./dto/page.update.dto";

@Injectable()
export class PageService{
  constructor(
    @InjectRepository(Page)
    private pageRepo: Repository<Page>,
    private resourceService: ResourceService
  ) {
  }

  async add(serviceDto: PageDto): Promise<Page> {
    let { image, ...pageLis } = serviceDto
    let pageCreate = {}
    if (image) {
      const filename = await this.resourceService.upload(image)
      pageCreate = {
        ...pageLis,
        image_id: filename.id
      };
    } else {
      pageCreate = this.pageRepo.create({
        ...pageLis,
      });
    }
    return await this.pageRepo.save(pageCreate);
  }

  async getAll(
    pageable: PagableDto,
    pageSearchDto: PageSearchDto
  ): Promise<SearchPage<Page>> {
    return findAllByPage({ repo: this.pageRepo, page: pageable, queryDto: pageSearchDto });
  }


  async getByIds(ids: Array<number>): Promise<Page[]> {
    const page = await this.pageRepo.find({
      where: { id: In(ids) },
      order: {
        id: "DESC",
      },
      relations: { image: true }
    });
    return page;
  }

  async getById(id: number): Promise<Page> {
    const service = await this.pageRepo.findOne({
      where: {
        id: id,
      },
      relations: { image: true }
    });
    if (!service) {
      throw new NotFoundException();
    }
    return service;
  }

  async update(id: number, serviceDto: PageUpdateDto): Promise<Page> {
    const serviceUpdate = await this.getById(id);
    const newupdate = await this.updateProperties(serviceUpdate, serviceDto);
    return this.pageRepo.save(newupdate);
  }


  private async updateProperties(modalToUpdate: Page, serviceDto: PageDto) {

    const { image, ...pageLis } = serviceDto

    if (image && "uid" in image) {
      const filename = await this.resourceService.upload(image)
      modalToUpdate.image_id = filename.id;
      delete modalToUpdate.image
    }
    return {
      ...modalToUpdate,
      ...pageLis,
    }

  }

  async getCount(): Promise<Number> {
    return await this.pageRepo.count();
  }
}
