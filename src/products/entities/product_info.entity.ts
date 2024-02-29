import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ProductsEntity } from 'src/products/products.entity'

@Entity({ name: 'product_info' })
export class ProductInfoEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 100 })
  name: string

  @Column({ type: 'varchar', length: 100 })
  description: string

  @Column({ type: 'varchar', length: 255 })
  image: string

  @OneToOne(() => ProductsEntity, (product) => product.product_info)
  product: ProductsEntity
}
