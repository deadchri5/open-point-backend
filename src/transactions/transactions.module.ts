import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TransactionsController } from './transactions.controller'
import { TransactionsService } from './transactions.service'
import { TransactionsEntity } from './transactions.entity'
import { TransactionProductEntity } from './entities/transactionProductsEntity.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionsEntity, TransactionProductEntity]),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
