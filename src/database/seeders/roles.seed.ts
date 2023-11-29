import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { RoleEntity } from '../../models/entities/role.entity';
import { Role } from '../../shared/enums/role.enum';

export default class RoleSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(RoleEntity)
      .values([
        {
          id: 1,
          name: Role.Admin,
        },
        {
          id: 2,
          name: Role.Mod,
        },
        {
          id: 3,
          name: Role.Student,
        }
      ])
      .execute();
  }
}
