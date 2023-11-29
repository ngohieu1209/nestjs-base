import { Injectable } from "@nestjs/common";
import { StudentEntity } from "../entities/student.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { COMMON_CONSTANT } from "src/shared/constants/common.constant";

@Injectable()
export class StudentRepository extends Repository<StudentEntity> {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly repository: Repository<StudentEntity>
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}