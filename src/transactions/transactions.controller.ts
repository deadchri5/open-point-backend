import {
  Body,
  Controller,
  ParseIntPipe,
  Post,
  Get,
  Param,
} from '@nestjs/common'
import { TransactionsService } from './transactions.service'
import AddTransactionDto from 'src/dto/transactions/addTransaction.dto'

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('create')
  async createTransaction(@Body() transaction: AddTransactionDto) {
    if (!transaction.products) {
      return {
        message: 'products is required',
        status: 400,
        data: null,
      }
    }
    transaction.created_at = new Date()
    if (!transaction.payment_method) {
      transaction.payment_method = 'cash'
    }
    try {
      const newTransaction =
        await this.transactionsService.generateNewTransaction(transaction)
      // save all product_transactions
      transaction.products.forEach(
        async (product) =>
          await this.transactionsService.setProductTransaction({
            transaction_id: newTransaction.id,
            price: product.price,
            product_id: product.id,
          }),
      )
      return {
        message: 'Transaction created successfully',
        status: 200,
        data: newTransaction,
      }
    } catch (error: any) {
      return {
        message: error.message,
        status: 400,
        data: null,
      }
    }
  }

  @Get('get-transaction-info/:id')
  async getTransactionInfo(@Param('id', ParseIntPipe) id: number) {
    try {
      const transaction = await this.transactionsService.getTransactionInfo(id)
      console.log(transaction)
      if (!transaction) {
        return {
          message: `No existe la transacción con id ${id}`,
          status: 400,
          data: null,
        }
      }
      return {
        message: 'Transaction info',
        status: 200,
        data: transaction,
      }
    } catch (error: any) {
      return {
        message: error.message,
        status: 400,
        data: null,
      }
    }
  }
}
