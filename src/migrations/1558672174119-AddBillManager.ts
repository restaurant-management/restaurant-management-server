import {MigrationInterface, QueryRunner} from "typeorm";

export class AddBillManager1558672174119 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "bill" ADD "managerUsername" character varying`);
        await queryRunner.query(`ALTER TABLE "bill" ADD CONSTRAINT "FK_0eacad58925dda9a44c1d941b57" FOREIGN KEY ("managerUsername") REFERENCES "user"("userName") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "bill" DROP CONSTRAINT "FK_0eacad58925dda9a44c1d941b57"`);
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "managerUsername"`);
    }

}
