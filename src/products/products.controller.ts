import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common'
import ProductDto from 'src/dto/products/product.dto'
import ProductInfoDto from 'src/dto/products/productInfo.dto'
import ProductPriceDto from 'src/dto/products/productPrice.dto'
import ProductCategoryDto from 'src/dto/products/productCategory.dto'
import { ProductsService } from './products.service'

type addNewProduct = ProductDto & ProductInfoDto & ProductPriceDto

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post('create')
  async createProduct(@Body() newProduct: addNewProduct) {
    try {
      const productPrice = await this.productService.createProductPrice({
        price: newProduct.price ?? 0,
        price_per_kg: newProduct.price_per_kg ?? 0,
        updated_at: new Date(),
      })
      const productInfo = await this.productService.createProductInfo({
        product_price_id: productPrice.id,
        name: newProduct.name,
        description: newProduct.description,
        image: newProduct.image ?? '',
      })
      const product = await this.productService.createProduct({
        provider_id: newProduct.provider_id,
        brand_id: newProduct.brand_id,
        product_price_id: productPrice.id,
        product_info_id: productInfo.id,
        category_id: newProduct.category_id,
        sku: newProduct.sku,
        ean: newProduct.ean,
        status: newProduct.status,
        stock: newProduct.stock,
        stock_fill_margin: newProduct.stock_fill_margin,
        created_at: new Date(),
        updated_at: new Date(),
      })
      return {
        message: 'producto creado',
        status: 200,
        data: {
          product,
        },
      }
    } catch (error: any) {
      return {
        message: error.message,
        status: 400,
        data: null,
      }
    }
  }

  @Post('createCategory')
  async createCategory(@Body() category: ProductCategoryDto) {
    try {
      const newCategory =
        await this.productService.createProductCategory(category)
      return {
        message: 'categoria creada',
        status: 200,
        data: {
          category: newCategory,
        },
      }
    } catch (error: any) {
      return {
        message: error.message,
        status: 400,
        data: null,
      }
    }
  }

  @Get('getAllCategories')
  async getAllCategories() {
    try {
      const categories = await this.productService.getAllCategories()
      if (!categories) {
        return {
          message: 'No se encontraron categorias',
          status: 400,
          data: null,
        }
      }
      return {
        message: 'Categorias encontradas',
        status: 200,
        data: {
          categories,
        },
      }
    } catch (error: any) {
      return {
        message: error.message,
        status: 400,
        data: null,
      }
    }
  }

  @Get('scanEAN/:ean')
  async getProductByEan(@Param('ean', ParseIntPipe) ean: number) {
    try {
      const productInDb = await this.productService.scanProductByEan(ean)
      if (!productInDb) {
        return {
          message: 'producto no encontrado',
          status: 404,
          data: null,
        }
      }
      const product = {
        ...productInDb.product_info,
        ...productInDb.product_price,
        brand: productInDb.brand,
      }
      return {
        message: 'producto encontrado',
        status: 200,
        data: {
          product,
        },
      }
    } catch (error: any) {
      return {
        message: error.message,
        status: 400,
        data: null,
      }
    }
  }
}
