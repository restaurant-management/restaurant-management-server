import {MigrationInterface, QueryRunner} from "typeorm";

export class AddBill1556444024782 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "bill" ("billId" SERIAL NOT NULL, "day" date NOT NULL, "userUserName" character varying, CONSTRAINT "PK_ded105d396cc380a858a4eed38c" PRIMARY KEY ("billId"))`);
        await queryRunner.query(`ALTER TABLE "bill" ADD CONSTRAINT "FK_b7e5d5c436dea2fac486f7fb338" FOREIGN KEY ("userUserName") REFERENCES "user"("userName") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "bill" DROP CONSTRAINT "FK_b7e5d5c436dea2fac486f7fb338"`);
        await queryRunner.query(`DROP TABLE "bill"`);
    }

}
