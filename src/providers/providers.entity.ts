import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { ProductsEntity } from 'src/products/products.entity'
import { OrderEntity } from 'src/orders/orders.entity'

@Entity({ name: 'providers' })
export class ProvidersEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string

  @Column({ type: 'varchar', length: 10, nullable: true })
  phone: string

  @Column({ type: 'timestamp with time zone' })
  created_at: Date

  @Column({ type: 'timestamp with time zone' })
  updated_at: Date

  @OneToMany(() => ProductsEntity, (product) => product.provider)
  products: ProductsEntity[]

  @OneToMany(() => OrderEntity, (order) => order.provider)
  orders: OrderEntity[]
}
