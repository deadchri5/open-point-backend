import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ProductsModule } from './products/products.module'
import { ProvidersModule } from './providers/providers.module'
import { BrandsModule } from './brands/brands.module'
import { OrdersModule } from './orders/orders.module'
import { ClientsController } from './clients/clients.controller'
import { ClientsModule } from './clients/clients.module'
import { TransactionsModule } from './transactions/transactions.module'
import { UserModule } from './user/user.module'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/database.module'

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.production.local'],
      isGlobal: true,
    }),
    ProductsModule,
    ProvidersModule,
    BrandsModule,
    OrdersModule,
    ClientsModule,
    TransactionsModule,
    UserModule,
  ],
  controllers: [AppController, ClientsController],
  providers: [AppService],
})
export class AppModule {}
