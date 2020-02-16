import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { rideStatus } from './../types/types.d'

@Entity()
class Ride extends BaseEntity {
  @PrimaryGeneratedColumn() id: number

  @Column({
    type: 'text',
    enum: ['ACCEPTED', 'FINISHED', 'CANCELED', 'REQUESTING', 'ONROUTE']
  })
  status: rideStatus

  @Column({ type: 'text' })
  pickUpAddress: string

  @Column({ type: 'double precision' })
  pickUpLat: number

  @Column({ type: 'double precision' })
  pickUpLng: number

  @Column({ type: 'text' })
  dropOffAddress: string

  @Column({ type: 'double precision' })
  dropOffLng: number

  @Column({ type: 'double precision' })
  dropOffLat: number

  @Column({ type: 'double precision' })
  price: number

  @Column({ type: 'text' })
  distance: string

  @Column({ type: 'text' })
  duration: string

  @CreateDateColumn()
  createdAt: string
  @UpdateDateColumn() updatedAt: string
}

export default Ride
