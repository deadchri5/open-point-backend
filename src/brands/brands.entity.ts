import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ProductsEntity } from 'src/products/products.entity'

@Entity({ name: 'brands' })
export class BrandsEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date

  @OneToMany(() => ProductsEntity, (products) => products.brand)
  products: ProductsEntity[]
}
