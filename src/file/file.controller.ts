import {
  Controller,
  HttpCode,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {FileService} from 'src/file/file.service';
import {Auth} from 'src/auth/decorators/auth.decorator';
import {FileInterceptor} from '@nestjs/platform-express';
import {ApiBearerAuth, ApiBody, ApiConsumes, ApiQuery, ApiTags} from "@nestjs/swagger";
import {FileUploadDto} from "src/file/dto/uploadFile.dto";

@ApiTags('file')
@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {
  }

  @ApiBearerAuth()
  @ApiQuery({name: 'folder', required: false})
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of cats',
    type: FileUploadDto
  })
  @Post()
  @HttpCode(200)
  @Auth('admin')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder?: string
  ) {
    return this.fileService.saveFiles([file], folder);
  }
}
