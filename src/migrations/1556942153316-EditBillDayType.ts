import {MigrationInterface, QueryRunner} from "typeorm";

export class EditBillDayType1556942153316 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "day"`);
        await queryRunner.query(`ALTER TABLE "bill" ADD "day" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "day"`);
        await queryRunner.query(`ALTER TABLE "bill" ADD "day" date NOT NULL`);
    }

}
