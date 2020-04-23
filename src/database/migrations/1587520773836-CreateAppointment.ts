import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointment1587520773836
	implements MigrationInterface {
	// eslint-disable-next-line prettier/prettier
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'appointments',
				columns: [
					{
						name: 'id',
						type: 'varchar',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'provider',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'date',
						type: 'timestamp with time zone',
						isNullable: false,
					},
					{
						name: 'created_at',
						type: 'timestamp',
						isNullable: false,
						default: 'now()',
					},
					{
						name: 'updated_at',
						type: 'timestamp',
						isNullable: false,
						default: 'now()',
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		queryRunner.dropTable('appointments');
	}
}
