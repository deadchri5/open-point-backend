export default interface TransactionDto {
  id?: number
  client_id?: number
  total_payment: number
  total_due: number
  payment_method: string
  created_at: Date
}
