import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ProductsEntity } from '../products.entity'

@Entity({ name: 'product_category' })
export class ProductCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string

  @Column({ type: 'text', nullable: true, default: null })
  description: string

  @OneToMany(() => ProductsEntity, (product) => product.product_category)
  products: ProductsEntity[]
}
