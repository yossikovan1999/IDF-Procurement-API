import {Controller,Post,
  Body,
  Param,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';


@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('check/:itemId')
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createImageDto: CreateImageDto,
    @Param('itemId', ParseIntPipe) itemId: number,
    @UploadedFile() file: Express.Multer.File
  ) {
      return this.imagesService.uploadImage(itemId, file);
  }
}
