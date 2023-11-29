import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { Role } from '../../shared/enums/role.enum';

@Entity({
  name: 'role',
})
export class RoleEntity extends BaseEntity {
  @Column({
    transformer: {
      to(value: string) {
        return value.toUpperCase();
      },
      from(value: string) {
        // Do nothing
        return value;
      }
    },
    unique: true,
    nullable: false,
    type: 'enum',
    enum: Role
  })
  name: Role;
  
  @OneToMany(() => UserEntity, (user) => user.role)
  user: UserEntity[];
}
