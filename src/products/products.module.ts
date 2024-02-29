import { Module } from '@nestjs/common'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductsEntity } from './products.entity'
import { ProductInfoEntity } from './entities/product_info.entity'
import { ProductPriceEntity } from './entities/product_price.entity'
import { ProductCategoryEntity } from './entities/ProductCategory.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductsEntity,
      ProductInfoEntity,
      ProductPriceEntity,
      ProductCategoryEntity,
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
