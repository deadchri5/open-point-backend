import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { ProductsEntity } from './products.entity'
import { ProductInfoEntity } from './entities/product_info.entity'
import { ProductPriceEntity } from './entities/product_price.entity'
import { ProductCategoryEntity } from './entities/ProductCategory.entity'
import { Repository } from 'typeorm'
import ProductDto from 'src/dto/products/product.dto'
import ProductInfoDto from 'src/dto/products/productInfo.dto'
import ProductPriceDto from 'src/dto/products/productPrice.dto'
import ProductCategoryDto from 'src/dto/products/productCategory.dto'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity)
    private productRepository: Repository<ProductsEntity>,
    @InjectRepository(ProductInfoEntity)
    private productInfoRepository: Repository<ProductInfoEntity>,
    @InjectRepository(ProductPriceEntity)
    private productPriceRepository: Repository<ProductPriceEntity>,
    @InjectRepository(ProductCategoryEntity)
    private productCategoryRepository: Repository<ProductCategoryEntity>,
  ) {}

  createProduct(product: ProductDto) {
    const newProduct = this.productRepository.create(product)
    return this.productRepository.save(newProduct)
  }

  createProductCategory(productCategoryDto: ProductCategoryDto) {
    return this.productCategoryRepository.save(productCategoryDto)
  }

  getAllCategories() {
    return this.productCategoryRepository.find()
  }

  /**
   * Get the essential information for a sale, call this function when you want
   * to register a product for a sale (scan)
   * @param {number} ean - European Article Number (Código de barras)
   * @returns Promise<ProductsEntity>
   */
  scanProductByEan(ean: number) {
    const product = this.productRepository.findOne({
      where: { ean },
      relations: ['product_info', 'product_price', 'brand'],
    })
    return product
  }

  createProductPrice(productPrice: ProductPriceDto) {
    const newProductPrice = this.productPriceRepository.create(productPrice)
    return this.productPriceRepository.save(newProductPrice)
  }

  createProductInfo(productInfo: ProductInfoDto) {
    const newProductInfo = this.productInfoRepository.create(productInfo)
    return this.productInfoRepository.save(newProductInfo)
  }
}
