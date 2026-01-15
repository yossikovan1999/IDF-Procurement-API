import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

@Injectable()
export class ImagesService {
 
  uploadImage(id : number, file : Express.Multer.File){

    if(file.originalname.split('.').pop() !== 'png'){
      return {itemId : id, isValid : false, reason : "not correct name"}
    }

    if(file.size > 250 * 1000000){
      return {itemId : id, isValid : false, reason : "File is too large"}
    }
    
    return {itemId : id, isValid : true, reason : null}
  
  }
}
