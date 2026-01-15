import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { DataMiddleware } from './middleware/data.middleware';
import { Item } from './entities/item.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, DataMiddleware],
  imports: [SequelizeModule.forFeature([Item])]
})
export class TransactionsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DataMiddleware)
      .forRoutes({ path: '/transactions/purchase', method: RequestMethod.POST });
  }
}
