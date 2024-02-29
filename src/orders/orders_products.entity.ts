import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm'

import { ProductsEntity } from 'src/products/products.entity'
import { OrderEntity } from './orders.entity'

@Entity('order_products')
export class OrdersProductsEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'integer' })
  order_id: number

  @Column({ type: 'integer' })
  product_id: number

  @Column({ type: 'integer' })
  quantity: number

  @ManyToOne(() => ProductsEntity, (product) => product.orderProducts)
  @JoinColumn({ name: 'product_id' })
  product: ProductsEntity

  @ManyToOne(() => OrderEntity, (order) => order.orderProducts)
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity
}
