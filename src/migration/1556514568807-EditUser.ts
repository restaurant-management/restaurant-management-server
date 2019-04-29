import {MigrationInterface, QueryRunner} from "typeorm";

export class EditUser1556514568807 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "bill" DROP CONSTRAINT "FK_b7e5d5c436dea2fac486f7fb338"`);
        await queryRunner.query(`ALTER TABLE "bill" RENAME COLUMN "userUserName" TO "userUserId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "userId" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_da5934070b5f2726ebfd3122c80"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_610ec300d7b421b0083bc274475" PRIMARY KEY ("userName", "userId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD "uuid" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_610ec300d7b421b0083bc274475"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName")`);
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "userUserId"`);
        await queryRunner.query(`ALTER TABLE "bill" ADD "userUserId" integer`);
        await queryRunner.query(`ALTER TABLE "bill" ADD CONSTRAINT "FK_e038999e760ba13d4dc70b66884" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "bill" DROP CONSTRAINT "FK_e038999e760ba13d4dc70b66884"`);
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "userUserId"`);
        await queryRunner.query(`ALTER TABLE "bill" ADD "userUserId" character varying`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_d72ea127f30e21753c9e229891e"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_610ec300d7b421b0083bc274475" PRIMARY KEY ("userName", "userId")`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "uuid"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_610ec300d7b421b0083bc274475"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_da5934070b5f2726ebfd3122c80" PRIMARY KEY ("userName")`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "bill" RENAME COLUMN "userUserId" TO "userUserName"`);
        await queryRunner.query(`ALTER TABLE "bill" ADD CONSTRAINT "FK_b7e5d5c436dea2fac486f7fb338" FOREIGN KEY ("userUserName") REFERENCES "user"("userName") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
