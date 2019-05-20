import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAvatarTableFavoriteComment1558352737683 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "favorite" ("username" character varying NOT NULL, "dishId" integer NOT NULL, CONSTRAINT "PK_ef0ed2e502f04155c4fab589413" PRIMARY KEY ("username", "dishId"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("commentId" SERIAL NOT NULL, "username" character varying NOT NULL, "dishId" integer NOT NULL, "content" character varying NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_1b03586f7af11eac99f4fdbf012" PRIMARY KEY ("commentId"))`);
        await queryRunner.query(`CREATE TABLE "table" ("tableId" SERIAL NOT NULL, "name" character varying, "numberOfSeats" integer NOT NULL, CONSTRAINT "PK_03ee48a7ca72ac0a4c7a42240d2" PRIMARY KEY ("tableId"))`);
        await queryRunner.query(`CREATE TYPE "daily_table_status_enum" AS ENUM('free', 'full')`);
        await queryRunner.query(`CREATE TABLE "daily_table" ("day" date NOT NULL, "session" character varying NOT NULL DEFAULT 'none', "status" "daily_table_status_enum" NOT NULL DEFAULT 'free', "tableId" integer, CONSTRAINT "PK_e2d51b18f36df40be92fb148af7" PRIMARY KEY ("day", "session"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "avatar" character varying`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_6620cd026ee2b231beac7cfe578"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "FK_bedf5af4cc089d961d87af28fbd" FOREIGN KEY ("username") REFERENCES "user"("userName") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "FK_0b836c07bc6c4196988f7a7b565" FOREIGN KEY ("dishId") REFERENCES "dish"("dishId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_6620cd026ee2b231beac7cfe578" FOREIGN KEY ("role") REFERENCES "role"("slug") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_6cdd91efa7b8c6432dea46c0fbd" FOREIGN KEY ("username") REFERENCES "user"("userName") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_53a21422a1a8ab475cd5b23711e" FOREIGN KEY ("dishId") REFERENCES "dish"("dishId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "daily_table" ADD CONSTRAINT "FK_2ed159935bcd87c0701619f1bcc" FOREIGN KEY ("tableId") REFERENCES "table"("tableId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "daily_table" DROP CONSTRAINT "FK_2ed159935bcd87c0701619f1bcc"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_53a21422a1a8ab475cd5b23711e"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_6cdd91efa7b8c6432dea46c0fbd"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_6620cd026ee2b231beac7cfe578"`);
        await queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "FK_0b836c07bc6c4196988f7a7b565"`);
        await queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "FK_bedf5af4cc089d961d87af28fbd"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_6620cd026ee2b231beac7cfe578" FOREIGN KEY ("role") REFERENCES "role"("slug") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar"`);
        await queryRunner.query(`DROP TABLE "daily_table"`);
        await queryRunner.query(`DROP TYPE "daily_table_status_enum"`);
        await queryRunner.query(`DROP TABLE "table"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "favorite"`);
    }

}
