import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTaskTable1707830884875 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "task" (
            "id" SERIAL NOT NULL,
            "title" character varying NOT NULL,
            "deadline" TIMESTAMP NOT NULL,
            "completed" boolean NOT NULL DEFAULT false,
            "userId" integer,
            CONSTRAINT "FK_user" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "task"`);
  }
}
