import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ClientsEntity } from 'src/clients/Clients.entity'
import { TransactionProductEntity } from './entities/transactionProductsEntity.entity'

@Entity({ name: 'transactions' })
export class TransactionsEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'integer', nullable: true })
  client_id: number

  @Column({ type: 'double precision', nullable: false })
  total_payment: number

  @Column({ type: 'double precision', nullable: false })
  total_due: number

  @Column({ type: 'varchar', length: 100, nullable: false })
  payment_method: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date

  @ManyToOne(() => ClientsEntity, (client) => client.transactions)
  @JoinColumn({ name: 'client_id' })
  client: ClientsEntity

  @OneToMany(
    () => TransactionProductEntity,
    (transaction_product) => transaction_product.transaction,
  )
  transactions_products: TransactionProductEntity[]
}
