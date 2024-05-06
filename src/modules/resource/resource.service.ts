import { Injectable } from "@nestjs/common";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { FileId } from "./helper/id.generator";
import { ResourceDto } from "./dto/resource.dto";
import { Resource } from "src/entities/resources.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { Status } from "src/common/enums/all.enum";
@Injectable()
export class ResourceService {

  constructor(
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,
    private readonly _configService: ConfigService
  ) { }

  async upload(file: ResourceDto): Promise<Resource> {
    // if (file["id"] !== undefined) {
    //   return { ...file, id: file["id"], status: Status.ACTIVE }
    // }
    const filename = FileId.getName(file);
    await this.moveFile("./public/resources/tmp/" + file.uid, "./public/resources/images/", filename);
    const resource = this.resourceRepository.create({
      name: filename,
      size: file.size,
      type: file.type,
      uid: file.uid,
      url: this.getUrl(filename)
    })
    return await this.resourceRepository.save(resource);
  }

  async getImage(fileid: string): Promise<ResourceDto> {
    const res = await this.resourceRepository.findOne({ where: { uid: fileid } });
    const { name, size, type, uid, url } = res;
    return { name: name, size, type, uid, url } as ResourceDto;
  }

  private async moveFile(sourcePath: string, destinationPath: string, fileName: string): Promise<void> {
    try {
      if (!existsSync(destinationPath)) {
        mkdirSync(destinationPath, { recursive: true }); // Create destination directory if needed
      }
      const fileContent = readFileSync(sourcePath);
      writeFileSync(destinationPath + fileName, fileContent);
    } catch (error) {
      console.error(`Error moving file: ${error}`);
      throw error; // For handling in controllers or services
    }
  }

  private getUrl(filename: string) {
    const baseUrl = this._configService.get('HOST_URL');
    return baseUrl + "/public/resources/images/" + filename
  }

}
