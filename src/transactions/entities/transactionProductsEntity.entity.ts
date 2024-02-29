import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ProductsEntity } from 'src/products/products.entity'
import { TransactionsEntity } from '../transactions.entity'

@Entity({ name: 'transaction_products' })
export class TransactionProductEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'integer' })
  transaction_id: number

  @Column({ type: 'integer' })
  product_id: number

  @Column({ type: 'double precision' })
  price: number

  @ManyToOne(() => ProductsEntity, (product) => product.transaction_product)
  @JoinColumn({ name: 'product_id' })
  product: ProductsEntity

  @ManyToOne(() => TransactionsEntity, (t) => t.transactions_products)
  @JoinColumn({ name: 'transaction_id' })
  transaction: TransactionsEntity
}
