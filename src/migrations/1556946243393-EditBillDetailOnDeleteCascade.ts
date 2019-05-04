import {MigrationInterface, QueryRunner} from "typeorm";

export class EditBillDetailOnDeleteCascade1556946243393 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "bill_detail" DROP CONSTRAINT "FK_6b583a18f101b04a31154f02601"`);
        await queryRunner.query(`ALTER TABLE "bill_detail" DROP CONSTRAINT "FK_e08fed1a4e7444261edf0d282d1"`);
        await queryRunner.query(`ALTER TABLE "bill_detail" ADD CONSTRAINT "FK_6b583a18f101b04a31154f02601" FOREIGN KEY ("billId") REFERENCES "bill"("billId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bill_detail" ADD CONSTRAINT "FK_e08fed1a4e7444261edf0d282d1" FOREIGN KEY ("dishId") REFERENCES "dish"("dishId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "bill_detail" DROP CONSTRAINT "FK_e08fed1a4e7444261edf0d282d1"`);
        await queryRunner.query(`ALTER TABLE "bill_detail" DROP CONSTRAINT "FK_6b583a18f101b04a31154f02601"`);
        await queryRunner.query(`ALTER TABLE "bill_detail" ADD CONSTRAINT "FK_e08fed1a4e7444261edf0d282d1" FOREIGN KEY ("dishId") REFERENCES "dish"("dishId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bill_detail" ADD CONSTRAINT "FK_6b583a18f101b04a31154f02601" FOREIGN KEY ("billId") REFERENCES "bill"("billId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
