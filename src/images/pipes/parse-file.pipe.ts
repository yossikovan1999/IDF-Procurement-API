import { FileTypeValidator, MaxFileSizeValidator, ParseFilePipe } from "@nestjs/common";


export const parseFilePipe = new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 300603000 }),
      new FileTypeValidator({ fileType: 'image/jpeg' }),
    ],
})