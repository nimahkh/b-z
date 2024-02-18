import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1707830869100 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL PRIMARY KEY,
                "username" varchar(255) UNIQUE NOT NULL,
                "password" varchar(255) NOT NULL
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
