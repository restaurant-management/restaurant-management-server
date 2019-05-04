import {MigrationInterface, QueryRunner} from "typeorm";

export class EditDefaultBillStatus1556939211055 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TYPE "bill_status_enum" RENAME TO "bill_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "bill_status_enum" AS ENUM('created', 'preparing', 'prepare-done', 'delivering', 'shipping', 'complete')`);
        await queryRunner.query(`ALTER TABLE "bill" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "bill" ALTER COLUMN "status" TYPE "bill_status_enum" USING "status"::"text"::"bill_status_enum"`);
        await queryRunner.query(`ALTER TABLE "bill" ALTER COLUMN "status" SET DEFAULT 'created'`);
        await queryRunner.query(`DROP TYPE "bill_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "bill" ALTER COLUMN "status" SET DEFAULT 'created'`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "bill" ALTER COLUMN "status" SET DEFAULT 'preparing'`);
        await queryRunner.query(`CREATE TYPE "bill_status_enum_old" AS ENUM('preparing', 'prepare-done', 'delivering', 'shipping', 'complete')`);
        await queryRunner.query(`ALTER TABLE "bill" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "bill" ALTER COLUMN "status" TYPE "bill_status_enum_old" USING "status"::"text"::"bill_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "bill" ALTER COLUMN "status" SET DEFAULT 'created'`);
        await queryRunner.query(`DROP TYPE "bill_status_enum"`);
        await queryRunner.query(`ALTER TYPE "bill_status_enum_old" RENAME TO "bill_status_enum"`);
    }

}
