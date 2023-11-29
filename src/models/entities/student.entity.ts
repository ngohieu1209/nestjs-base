import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { GENDER } from '../../shared/enums/gender.enum';

@Entity({
  name: 'student',
})
export class StudentEntity extends BaseEntity {
  @Column({ unique: true })
  studentCode: string

  @Column({ length: 11 })
  phoneNumber: string;
  
  @Column()
  birthday: Date;
  
  @Column({
    type: 'enum',
    enum: GENDER
  })
  gender: GENDER;
  
  @Column()
  address: string;

  @OneToOne(() => UserEntity, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'userId'
  })
  user: UserEntity
}
