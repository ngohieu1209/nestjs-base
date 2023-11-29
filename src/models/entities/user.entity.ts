import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Exclude } from 'class-transformer';
import { RoleEntity } from './role.entity';

@Entity({
  name: 'user',
})
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;
  
  @Column()
  name: string;
  
  @Column({
    nullable: true
  })
  avatar: string;
  
  @ManyToOne(() => RoleEntity, (role) => role.user, {
    eager: true
  })
  role: RoleEntity
}
