import {MigrationInterface, QueryRunner} from "typeorm";

export class AddBillDetail1556445831436 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "bill_detail" ("billId" integer NOT NULL, "quantity" integer NOT NULL DEFAULT 0, CONSTRAINT "PK_6b583a18f101b04a31154f02601" PRIMARY KEY ("billId"))`);
        await queryRunner.query(`ALTER TABLE "bill_detail" ADD CONSTRAINT "FK_6b583a18f101b04a31154f02601" FOREIGN KEY ("billId") REFERENCES "bill"("billId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "bill_detail" DROP CONSTRAINT "FK_6b583a18f101b04a31154f02601"`);
        await queryRunner.query(`DROP TABLE "bill_detail"`);
    }

}
