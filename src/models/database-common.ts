import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { COMMON_CONSTANT } from 'src/shared/constants/common.constant';
import { RoleEntity, StudentEntity, UserEntity } from './entities';
import { RoleRepository, StudentRepository, UserRepository } from './repositories';

const CommonEntities = [
  RoleEntity,
  UserEntity,
  StudentEntity
];

const CommonRepositories = [
  RoleRepository,
  UserRepository,
  StudentRepository
];

@Global()
@Module({
  imports: [TypeOrmModule.forFeature(CommonEntities)],
  providers: [...CommonRepositories],
  exports: [TypeOrmModule, ...CommonRepositories],
})
export class DatabaseCommonModule {}