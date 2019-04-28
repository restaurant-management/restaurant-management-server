import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDish1556446447317 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "dish" ("dishId" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" character varying, "images" text array NOT NULL, "defaultPrice" integer NOT NULL DEFAULT 0, CONSTRAINT "PK_bfaea55c34eed191cac380642ee" PRIMARY KEY ("dishId"))`);
        await queryRunner.query(`ALTER TABLE "bill_detail" ADD "dishId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bill_detail" DROP CONSTRAINT "PK_6b583a18f101b04a31154f02601"`);
        await queryRunner.query(`ALTER TABLE "bill_detail" ADD CONSTRAINT "PK_0e3ebed9afb7615f099dd269be0" PRIMARY KEY ("billId", "dishId")`);
        await queryRunner.query(`ALTER TABLE "bill_detail" ADD CONSTRAINT "FK_e08fed1a4e7444261edf0d282d1" FOREIGN KEY ("dishId") REFERENCES "dish"("dishId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "bill_detail" DROP CONSTRAINT "FK_e08fed1a4e7444261edf0d282d1"`);
        await queryRunner.query(`ALTER TABLE "bill_detail" DROP CONSTRAINT "PK_0e3ebed9afb7615f099dd269be0"`);
        await queryRunner.query(`ALTER TABLE "bill_detail" ADD CONSTRAINT "PK_6b583a18f101b04a31154f02601" PRIMARY KEY ("billId")`);
        await queryRunner.query(`ALTER TABLE "bill_detail" DROP COLUMN "dishId"`);
        await queryRunner.query(`DROP TABLE "dish"`);
    }

}
