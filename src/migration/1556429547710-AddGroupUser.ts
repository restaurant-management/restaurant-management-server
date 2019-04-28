import {MigrationInterface, QueryRunner} from "typeorm";

export class AddGroupUser1556429547710 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "group_user" ("groupId" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" character varying, CONSTRAINT "PK_79924246e997ad08c58819ac21d" PRIMARY KEY ("groupId"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "groupIdGroupId" integer`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "fullName"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "fullName" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "birthday"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "birthday" date`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "point" SET DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_54ab1825c1859c5cf53e1af7473" FOREIGN KEY ("groupIdGroupId") REFERENCES "group_user"("groupId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_54ab1825c1859c5cf53e1af7473"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "point" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "birthday"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "birthday" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "fullName"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "fullName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "groupIdGroupId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`DROP TABLE "group_user"`);
    }

}
