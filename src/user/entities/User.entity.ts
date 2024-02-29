import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { UserTypeEntity } from './UserType.entity'
import { CashClosingEntity } from './CashClosing.entity'
import { OrderEntity } from 'src/orders/orders.entity'

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: number

  @Column({ type: 'varchar', length: 100, nullable: false })
  lastName: string

  @Column({ type: 'varchar', length: 50, nullable: false })
  user: string

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string

  @ManyToOne(() => UserTypeEntity, (user_type) => user_type.user)
  user_type: UserTypeEntity

  @OneToMany(() => CashClosingEntity, (cash_closing) => cash_closing.user)
  cash_closing: CashClosingEntity[]

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[]
}
