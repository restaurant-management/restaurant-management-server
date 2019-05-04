import {MigrationInterface, QueryRunner} from "typeorm";

export class EditBillDetailQuantityDeafault11556942554945 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "bill_detail" ALTER COLUMN "quantity" SET DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "bill_detail" ALTER COLUMN "quantity" SET DEFAULT 0`);
    }

}
