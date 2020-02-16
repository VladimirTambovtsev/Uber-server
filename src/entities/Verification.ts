import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert
} from 'typeorm'
import { verificationTarget } from './../types/types.d'

const PHONE = 'PHONE'
const EMAIL = 'EMAIL'

@Entity()
class Verification extends BaseEntity {
  @PrimaryGeneratedColumn() id: number

  @Column({ type: 'text', enum: [PHONE, EMAIL] })
  target: verificationTarget

  @Column({ type: 'text' })
  payload: string

  @Column({ type: 'text' })
  key: string

  @Column({ type: 'boolean', default: false })
  used: boolean

  @CreateDateColumn({ type: 'text' })
  createdAt: string

  @UpdateDateColumn({ type: 'text' })
  updatedAt: string

  @BeforeInsert()
  createKey(): void {
    if (this.target === PHONE) {
      this.key = Math.floor(Math.random() * 100000).toString()
    } else if (this.target === EMAIL) {
      this.key = Math.random()
        .toString(26)
        .substr(2)
    }
  }
}

export default Verification
