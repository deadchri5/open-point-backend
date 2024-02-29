import {
  Controller,
  Body,
  Post,
  Delete,
  Param,
  Get,
  Patch,
} from '@nestjs/common'
import { BrandsService } from './brands.service'
import BrandsDto from 'src/dto/brand/brand.dto'

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post('register')
  async createBrand(@Body() newBrand: BrandsDto) {
    newBrand.createdAt = new Date()
    newBrand.updatedAt = new Date()
    try {
      const brand = await this.brandsService.createBrand(newBrand)
      return {
        message: 'La marca se registro correctamente',
        status: 200,
        data: brand,
      }
    } catch (error: any) {
      return {
        message: error.message,
        status: 400,
        data: null,
      }
    }
  }

  @Get('getAllBrands')
  async getAllBrands() {
    try {
      const brands = await this.brandsService.getAllBrands()
      return {
        message: 'Se encontraron las marcas',
        status: 200,
        data: brands,
      }
    } catch (error: any) {
      return {
        message: error.message,
        status: 400,
        data: null,
      }
    }
  }

  @Get('search/:id')
  async searchBrand(@Param('id') id: number) {
    try {
      const brand = await this.brandsService.findBrandById(id)
      if (!brand) {
        return {
          message: `No existe una marca con el id ${id}`,
          status: 400,
          data: null,
        }
      }
      return {
        message: 'Se encontro la marca',
        status: 200,
        data: brand,
      }
    } catch (error: any) {
      return {
        message: error.message,
        status: 400,
        data: null,
      }
    }
  }

  @Get('getProducts/:id')
  async getProductsByBrand(@Param('id') id: number) {
    try {
      const products = await this.brandsService.getProductsByBrand(id)
      if (!products) {
        return {
          message: `No existen productos de la marca con el id ${id}`,
          status: 400,
          data: null,
        }
      }
      return {
        message: 'Productos encontrados',
        status: 200,
        data: products,
      }
    } catch (error: any) {
      return {
        message: error.message,
        status: 400,
        data: null,
      }
    }
  }

  @Patch('update/:id')
  async updateBrand(@Param('id') id: number, @Body() newBrand: BrandsDto) {
    try {
      const brand = await this.brandsService.findBrandById(id)
      if (!brand) {
        return {
          message: `No existe una marca con el id ${id}`,
          status: 400,
          data: null,
        }
      }
      brand.name = newBrand.name ? newBrand.name : brand.name
      brand.image = newBrand.image ? newBrand.image : brand.image
      brand.updated_at = new Date()
      await this.brandsService.editBrand(brand)
      return {
        message: 'Se actualizo la marca correctamente',
        status: 200,
        data: brand,
      }
    } catch (error: any) {
      return {
        message: error.message,
        status: 400,
        data: null,
      }
    }
  }

  @Delete('delete/:id')
  async deleteBrand(@Param('id') id: number) {
    try {
      await this.brandsService.deleteBrand(id)
      return {
        message: `Se elimino la marca con id ${id} correctamente`,
        status: 200,
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
