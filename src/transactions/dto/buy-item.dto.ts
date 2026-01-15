import { IsString, IsInt, Min, IsNotEmpty, IsBoolean, ValidateNested, IsArray} from 'class-validator';
import {Transform} from 'class-transformer'

export class BuyItemDto {
    
    @IsString()
    @IsNotEmpty()
    id : string

    @IsString()
    @IsNotEmpty()
    name : string
   
    @IsString()
    @IsNotEmpty()
    type : string
    
    @Min(1)
    @IsInt()
    @IsNotEmpty()
    quantity : number
     
    @Min(0)
    @IsInt()
    @IsNotEmpty()
    pricePerUnit : number
    
}
