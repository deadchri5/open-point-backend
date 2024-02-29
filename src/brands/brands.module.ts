import { Module } from '@nestjs/common'
import { BrandsService } from './brands.service'
import { BrandsController } from './brands.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BrandsEntity } from './brands.entity'
import { ProductsEntity } from 'src/products/products.entity'

@Module({
  imports: [TypeOrmModule.forFeature([BrandsEntity, ProductsEntity])],
  providers: [BrandsService],
  controllers: [BrandsController],
})
export class BrandsModule {}
