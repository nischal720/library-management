import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Request,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { ResourceService } from "./resource.service";
import { ResourceDto } from "./dto/resource.dto";
import { FileId } from "./helper/id.generator";
import { ResourceResponseDto } from "./dto/resource.response.dto";
import { plainToInstance } from "class-transformer";

@ApiTags("resources")
// @ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
@Controller("resources")
export class ResourcesController {
  constructor(
    private imageService: ResourceService,
  ) { }

  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload Single image' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    type: ResourceResponseDto,
  })
  @Post('/image')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: 'public/resources/tmp',
      filename: (req, file, cb) => {
        cb(null, FileId.getTmpId());
      },
    }),
  }))
  addSingleResource(@UploadedFile() file: Express.Multer.File): ResourceResponseDto {
    const fil: ResourceResponseDto = { uid: file.filename, name: file.originalname, url: file.path, size: file.size.toString(), type: file.mimetype } as ResourceResponseDto;
    return plainToInstance(ResourceResponseDto, fil)
  }

  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload Multiple image' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiResponse({
    type: [ResourceResponseDto],
  })
  @Post('/images')
  @UseInterceptors(FilesInterceptor("files", 5, {
    storage: diskStorage({
      destination: 'public/resources/tmp',
      filename: (req, file, cb) => {
        console.log(file)
        cb(null, FileId.getTmpId());
      },
    }),
  }))
  addMultipleResource(@UploadedFiles() files: Array<Express.Multer.File>): ResourceResponseDto[] {
    const fil = files.map(file => {
      return { uid: file.filename, name: file.filename, url: file.path, size: file.size.toString(), type: file.mimetype } as ResourceResponseDto;
    });
    return plainToInstance(ResourceResponseDto, fil)
  }

  // @ApiResponse({ description: "Upload Single image" })
  // @Post('/images')
  // @UseInterceptors(FileInterceptor('file'))
  // addMultiResource(@UploadedFiles() files: Express.Multer.File): Promise<Resource> {
  //   // return this.imageService.addResources(files);
  // }

  // @Get("/:imageId")
  // getResourceById(
  //   @Param("imageId") imageId: number
  // ): Promise<Resource> {
  //   return this.imageService.getResourceById(imageId);
  // }

  // @Put("/:imageId/state")
  // updateResourceStatus(@Param("imageId") imageId: number): Promise<Resource> {
  //   return this.imageService.updateResourceStatus(imageId);
  // }
}
