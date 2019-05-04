import {MigrationInterface, QueryRunner} from "typeorm";

export class EditBillWithUsername1556943302899 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "bill" DROP CONSTRAINT "FK_e038999e760ba13d4dc70b66884"`);
        await queryRunner.query(`ALTER TABLE "bill" RENAME COLUMN "userUserId" TO "username"`);
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "bill" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bill" ADD CONSTRAINT "FK_33197422613d500b4928bb30d02" FOREIGN KEY ("username") REFERENCES "user"("userName") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "bill" DROP CONSTRAINT "FK_33197422613d500b4928bb30d02"`);
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "bill" ADD "username" integer`);
        await queryRunner.query(`ALTER TABLE "bill" RENAME COLUMN "username" TO "userUserId"`);
        await queryRunner.query(`ALTER TABLE "bill" ADD CONSTRAINT "FK_e038999e760ba13d4dc70b66884" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
