import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UserEntity } from './User.entity'

@Entity({ name: 'cash_closing' })
export class CashClosingEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'timestamp' })
  date: Date

  @Column({ type: 'integer' })
  user_id: number

  @Column({ type: 'double precision', nullable: false })
  total_cash: number

  @Column({ type: 'text' })
  details: string

  @ManyToOne(() => UserEntity, (user) => user.cash_closing)
  user: UserEntity
}
