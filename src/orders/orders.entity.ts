import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { OrdersProductsEntity } from './orders_products.entity'
import { UserEntity } from 'src/user/entities/User.entity'
import { ProvidersEntity } from 'src/providers/providers.entity'

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'integer' })
  order_products_id: number

  @Column({ type: 'integer' })
  user_id: number

  @Column({ type: 'integer' })
  provider_id: number

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date

  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity

  @ManyToOne(() => ProvidersEntity, (provider) => provider.orders)
  @JoinColumn({ name: 'provider_id' })
  provider: ProvidersEntity

  @OneToMany(
    () => OrdersProductsEntity,
    (order_products) => order_products.order,
  )
  orderProducts: OrdersProductsEntity[]
}
