import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { TransactionsEntity } from './transactions.entity'
import { TransactionProductEntity } from './entities/transactionProductsEntity.entity'
import AddTransactionDto from 'src/dto/transactions/addTransaction.dto'
import TransactionProductDto from 'src/dto/transactions/transaction_products.dto'

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionsEntity)
    private transactionsRepository: Repository<TransactionsEntity>,
    @InjectRepository(TransactionProductEntity)
    private transactionProductRepository: Repository<TransactionProductEntity>,
  ) {}

  generateNewTransaction(transaction: AddTransactionDto) {
    return this.transactionsRepository.save(transaction)
  }

  /**
   * add to table transaction_product to store the products in each transaction
   */
  setProductTransaction(product_transaction: TransactionProductDto) {
    return this.transactionProductRepository.save(product_transaction)
  }

  async getTransactionInfo(id: number) {
    // const product_data = await DataSource
    return {}
  }
}
