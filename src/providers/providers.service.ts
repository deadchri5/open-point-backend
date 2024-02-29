import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProvidersEntity } from './providers.entity'
import { ProviderDto } from 'src/dto/provider/provider.dto'

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(ProvidersEntity)
    private providersRepository: Repository<ProvidersEntity>,
  ) {}

  /**
   * Add a provider to providers table
   * @param {ProviderDto} provider new provider info
   * @returns Promise<ProviderDto>
   */
  addProvider(provider: ProviderDto) {
    return this.providersRepository.save(provider)
  }

  getProviderById(providerId: number) {
    return this.providersRepository.findOneBy({ id: providerId })
  }

  getAllProviders() {
    return this.providersRepository.find({
      select: ['id', 'name', 'phone'],
    })
  }
}
