import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPriceToBillDetail1558519496006 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "bill_detail" ADD "price" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "bill_detail" DROP COLUMN "price"`);
    }

}
