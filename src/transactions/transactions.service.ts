import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { readFromJsonFile } from '../utils/readJsonFile';
import { writeToJsonFile } from '../utils/updateJsonFile';
import { Item } from './entities/item.entity';
import { InjectModel } from '@nestjs/sequelize';
import { BuyItemDto } from './dto/buy-item.dto';
import { ReturnInterface } from './interfaces/return.interfaces';

@Injectable()
export class TransactionsService {
  private FILE_NAME: string = './data/data.json';

  constructor(@InjectModel(Item) private itmeModel: typeof Item) {}

  /*
  this function will validate if the purchase is valid and there is enough money in the 
  budget to perform the total purchase.
  */
  private async validatePurchase(buyItemDtoArr: BuyItemDto[], budget: number) {
    let count = 0;

    for (const buyItemDto of buyItemDtoArr) {
      count += buyItemDto.pricePerUnit * buyItemDto.quantity;
    }

    if (budget - count < 0) {
      throw new BadRequestException('not enough in the budget.');
    }
  }

  private async handlePurchase(buyItemDtoArr: BuyItemDto[]) {
    let totalCost: number = 0;

    const results: Array<ReturnInterface> = [];

    //purchase and if doesnt exist create product.
    for (const buyItemDto of buyItemDtoArr) {
      const item = await this.itmeModel.findOne({where: { id: buyItemDto.id }});

      //if the item does not exist in the db it will be created and increment the
      // value of products in the db.
      if (!item) {
        await this.createItem(buyItemDto);
        
        const currentCost: number = buyItemDto.pricePerUnit * buyItemDto.quantity;
        
        results.push({id: buyItemDto.id, newQuantity: buyItemDto.quantity, spent: buyItemDto.pricePerUnit * buyItemDto.quantity,});
        
        totalCost += currentCost;
        continue;
      }

      //if the value exists in the db find the product and increment the value by the amount purchased
      //afterwards add the total cost.
      this.itmeModel.increment(['quantity'], { by: buyItemDto.quantity, where: { id: item.id }});

      const currentCost: number = buyItemDto.pricePerUnit * buyItemDto.quantity;
      
      results.push({
        id: buyItemDto.id,
        newQuantity: item.dataValues.quantity + buyItemDto.quantity,
        spent: currentCost,
      });

      totalCost += currentCost;
    }

    return { results, totalCost };
  }

  async createItem(buyItemDto: BuyItemDto) {
    const result = await this.itmeModel.create({ ...buyItemDto });
    return { message: 'item created successfully.' };
  }

  async purchase(buyItemDtoArr: BuyItemDto[]) {
    //read dat from json file
    const data = await readFromJsonFile(this.FILE_NAME);

    //get the total budget.
    const budget = data.budget;

    //validate that the budget is greater then zero after all purchases.
    await this.validatePurchase(buyItemDtoArr, budget);

    //handle the purchasing.
    const results: { results: Array<ReturnInterface>; totalCost: number } = await this.handlePurchase(buyItemDtoArr);
     
    const newBudget = {budget : budget - results.totalCost}

    //create updated budget and write it to the file.
    await writeToJsonFile(this.FILE_NAME, newBudget);
    
    return results.results;
  }
}
