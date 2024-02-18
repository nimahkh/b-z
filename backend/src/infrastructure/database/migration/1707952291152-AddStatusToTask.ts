import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddStatusToTask1707952291152 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'task',
      new TableColumn({
        name: 'status',
        type: 'enum',
        enum: ['todo', 'inProgress', 'done'],
        default: "'todo'",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('task', 'status');
  }
}
