import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseArrayPipe } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

import { BuyItemDto } from './dto/buy-item.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('purchase')
  create(@Body(new ParseArrayPipe({items : BuyItemDto})) buyItemDtoArr: BuyItemDto[]) {
    return this.transactionsService.purchase(buyItemDtoArr);
  }
}
