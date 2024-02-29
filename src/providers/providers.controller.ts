import {
  Body,
  Controller,
  ParseIntPipe,
  Post,
  Get,
  Param,
} from '@nestjs/common'
import { ProviderDto } from 'src/dto/provider/provider.dto'
import { ProvidersService } from './providers.service'

@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}
  @Post('addProvider')
  async addProvider(@Body() providerDto: ProviderDto) {
    providerDto.created_at = new Date()
    providerDto.updated_at = new Date()
    try {
      const provider = await this.providersService.addProvider(providerDto)
      return {
        message: 'Provider added successfully',
        status: 200,
        data: {
          provider,
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

  @Get('getProvider/:id')
  async getProvider(@Param('id', ParseIntPipe) id: number) {
    try {
      const provider = await this.providersService.getProviderById(id)
      if (!provider) {
        return {
          message: `No existe el proveedor con id ${id}`,
          status: 400,
          data: null,
        }
      }
      return {
        message: 'Provider found',
        status: 200,
        data: {
          provider,
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

  @Get('getProviders')
  async getProviders() {
    try {
      const providers = await this.providersService.getAllProviders()
      if (!providers) {
        return {
          message: 'No se han creado proveedores',
          status: 400,
          data: null,
        }
      }
      return {
        message: 'Providers found',
        status: 200,
        data: {
          providers,
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
