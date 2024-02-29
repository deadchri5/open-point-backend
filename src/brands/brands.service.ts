import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BrandsEntity } from './brands.entity'
import { ProductsEntity } from '../products/products.entity'
import BrandsDto from 'src/dto/brand/brand.dto'

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(BrandsEntity)
    private brandsRepository: Repository<BrandsEntity>,
    @InjectRepository(ProductsEntity)
    private productsRepository: Repository<ProductsEntity>,
  ) {}

  createBrand(brand: BrandsDto) {
    const newBrand = this.brandsRepository.create(brand)
    return this.brandsRepository.save(newBrand)
  }

  async editBrand(brandDto: BrandsDto) {
    try {
      await this.brandsRepository.update(brandDto.id, brandDto)
      const updatedBrand = await this.brandsRepository.findOne({
        where: { id: brandDto.id },
      })
      return updatedBrand
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  findBrandById(id: number) {
    return this.brandsRepository.findOne({ where: { id } })
  }

  getAllBrands() {
    return this.brandsRepository.find()
  }

  async getProductsByBrand(brandId: number) {
    const brand = await this.brandsRepository.findOne({
      where: { id: brandId },
      relations: [
        'products',
        'products.product_info',
        'products.product_price',
        'products.product_category',
      ],
    })
    return brand.products
  }

  deleteBrand(id: number) {
    return this.brandsRepository.delete(id)
  }
}
