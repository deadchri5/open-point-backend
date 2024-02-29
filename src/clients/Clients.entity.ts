import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { TransactionsEntity } from 'src/transactions/transactions.entity'

@Entity({ name: 'clients' })
export class ClientsEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 50, nullable: true })
  alias: string

  @Column({ type: 'varchar', length: 100 })
  name: string

  @Column({ type: 'double precision', default: 0, nullable: false })
  balance: number

  @OneToMany(() => TransactionsEntity, (transaction) => transaction.client)
  transactions: TransactionsEntity[]
}
