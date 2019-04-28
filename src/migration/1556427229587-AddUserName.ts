import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserName1556427229587 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "id" TO "userName"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "PK_cace4a159ff9f2512dd42373760" TO "PK_da5934070b5f2726ebfd3122c80"`);
        await queryRunner.query(`ALTER SEQUENCE "user_id_seq" RENAME TO "user_userName_seq"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_da5934070b5f2726ebfd3122c80"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "userName"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "userName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_da5934070b5f2726ebfd3122c80" PRIMARY KEY ("userName")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_da5934070b5f2726ebfd3122c80"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "userName"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "userName" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_da5934070b5f2726ebfd3122c80" PRIMARY KEY ("userName")`);
        await queryRunner.query(`ALTER SEQUENCE "user_userName_seq" RENAME TO "user_id_seq"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "PK_da5934070b5f2726ebfd3122c80" TO "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "userName" TO "id"`);
    }

}
