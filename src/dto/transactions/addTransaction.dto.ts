import TransactionDto from './transaction.dto'

export default interface AddTransactionDto extends TransactionDto {
  products: {
    id: number
    price: number
  }[]
}
