import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { UserEntity } from './User.entity'

@Entity({ name: 'user_type' })
export class UserTypeEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'integer' })
  user_id: number

  @Column({ type: 'integer', nullable: false })
  type: number

  @Column({ type: 'varchar', length: 30, unique: true, nullable: false })
  description: string

  @OneToMany(() => UserEntity, (user) => user.user_type)
  user: UserEntity[]
}
