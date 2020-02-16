import bcrypt from 'bcrypt'
import { IsEmail } from 'class-validator'
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany
} from 'typeorm'
import Chat from './Chat'
import Message from './Message'
import Verification from './Verification'
import Ride from './Ride'

const BCRYPT_ROUNDS = 10

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number

  @Column({ type: 'text', unique: true })
  @IsEmail()
  email: string

  @Column({ type: 'boolean', default: false })
  verifiedEmail: boolean

  @Column({ type: 'text' })
  firstname: boolean

  @Column({ type: 'text' })
  lastname: boolean

  @Column({ type: 'int' })
  age: number

  @Column({ type: 'text' })
  password: string

  @Column({ type: 'text' })
  phoneNumber: string

  @Column({ type: 'boolean', default: false })
  verifiedPhoneNumber: boolean

  @Column({ type: 'text' })
  profilePhoto: string

  @Column({ type: 'boolean', default: false })
  isDriving: boolean

  @Column({ type: 'boolean', default: false })
  isRiding: boolean

  @Column({ type: 'boolean', default: false })
  isTaken: boolean

  @Column({ type: 'double precision', default: 0 })
  lastLng: boolean

  @Column({ type: 'double precision', default: 0 })
  lastLat: boolean

  @Column({ type: 'double precision', default: 0 })
  lastOrientation: boolean

  @ManyToOne(
    type => Chat,
    chat => chat.participants
  )
  chat: Chat

  @OneToMany(
    type => Message,
    message => message.user
  )
  messages: Message[]

  @OneToMany(
    type => Verification,
    verification => verification.user
  )
  verifications: Verification[]

  @OneToMany(
    type => Ride,
    ride => ride.passenger
  )
  ridesAsPassenger: Ride[]

  @OneToMany(
    type => Ride,
    ride => ride.driver
  )
  ridesAsDriver: Ride[]

  @CreateDateColumn()
  createdAt: string

  @UpdateDateColumn()
  updatedAt: string

  @BeforeInsert()
  @BeforeUpdate()
  async savePassword(): Promise<void> {
    if (this.password) {
      const hashedPassword = await this.hashPassword(this.password)
      this.password = hashedPassword
    }
  }

  get fullName(): string {
    return `${this.firstname} ${this.lastname}`
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS)
  }

  public comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password)
  }
}

export default User
