import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm'
import { ProvidersEntity } from 'src/providers/providers.entity'
import { ProductInfoEntity } from 'src/products/entities/product_info.entity'
import { ProductPriceEntity } from 'src/products/entities/product_price.entity'
import { ProductCategoryEntity } from './entities/ProductCategory.entity'
import { BrandsEntity } from 'src/brands/brands.entity'
import { OrdersProductsEntity } from 'src/orders/orders_products.entity'
import { TransactionProductEntity } from 'src/transactions/entities/transactionProductsEntity.entity'

@Entity({ name: 'products' })
export class ProductsEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number

  @Column({ type: 'integer' })
  provider_id: number

  @Column({ type: 'integer' })
  brand_id: number

  @Column({ type: 'integer' })
  product_info_id: number

  @Column({ type: 'integer' })
  product_price_id: number

  @Column({ type: 'integer', nullable: false })
  category_id: number

  @Column({ type: 'varchar' })
  sku: string

  @Column({ type: 'bigint', unsigned: true, unique: true })
  ean: number

  @Column({ type: 'boolean', default: 'true' })
  status: boolean

  @Column({ type: 'integer' })
  stock: number

  @Column({ type: 'integer' })
  stock_fill_margin: number

  @Column({ type: 'timestamp' })
  created_at: Date

  @Column({ type: 'timestamp' })
  updated_at: Date

  @OneToOne(() => ProductInfoEntity, (product_info) => product_info.product, {
    cascade: true,
  })
  @JoinColumn({ name: 'product_info_id' })
  product_info: ProductInfoEntity

  @OneToOne(() => ProductPriceEntity, (product_price) => product_price.product)
  @JoinColumn({ name: 'product_price_id' })
  product_price: ProductPriceEntity

  @ManyToOne(() => ProvidersEntity, (provider) => provider.products)
  @JoinColumn({ name: 'provider_id' })
  provider: ProvidersEntity

  @ManyToOne(() => BrandsEntity, (brand) => brand.products)
  @JoinColumn({ name: 'brand_id' })
  brand: BrandsEntity

  @OneToMany(
    () => TransactionProductEntity,
    (transaction_product) => transaction_product.product,
  )
  transaction_product: TransactionProductEntity[]

  @ManyToOne(
    () => ProductCategoryEntity,
    (product_category) => product_category.products,
  )
  @JoinColumn({ name: 'category_id' })
  product_category: ProductCategoryEntity

  @OneToMany(
    () => OrdersProductsEntity,
    (order_products) => order_products.product,
  )
  orderProducts: OrdersProductsEntity[]
}
