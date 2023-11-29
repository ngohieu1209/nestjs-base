import { Injectable } from '@nestjs/common';
import type { DataSource, QueryRunner } from 'typeorm';

@Injectable()
export class DatabaseUtilService {
  async executeTransaction(
    dataSource: DataSource,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: (queryRunner: QueryRunner) => any,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let result: any = null;
    const queryRunner: QueryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      result = await callback(queryRunner);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw error;
    } finally {
      await queryRunner.release();
    }

    return result;
  }
}
