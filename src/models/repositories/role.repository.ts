import { Injectable } from "@nestjs/common";
import { Repository, DataSource } from "typeorm";
import { RoleEntity } from "../entities";
import { Role } from "src/shared/enums/role.enum";
import { InjectRepository } from "@nestjs/typeorm";
import { COMMON_CONSTANT } from "src/shared/constants/common.constant";

@Injectable()
export class RoleRepository extends Repository<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly repository: Repository<RoleEntity>
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
  
  async getRoleId(name: Role) {
    const role = await this.findOne({ where: { name } });
    return role.id;
  }
}