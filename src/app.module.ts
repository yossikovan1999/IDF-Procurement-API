import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsModule } from './transactions/transactions.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Item} from './transactions/entities/item.entity';

@Module({
  imports: [
    TransactionsModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'MilitaryProducts',
      models: [Item],
      synchronize : true,
      autoLoadModels : true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
