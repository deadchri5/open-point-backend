import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ProductsEntity } from 'src/products/products.entity'

@Entity({ name: 'product_price' })
export class ProductPriceEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'double precision', nullable: true, default: null })
  price: number

  @Column({ type: 'double precision', nullable: true, default: null })
  price_per_kg: number

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date

  @OneToOne(() => ProductsEntity, (product) => product.product_price)
  product: ProductsEntity
}
