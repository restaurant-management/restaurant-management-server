import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDailyStorage1556465399333 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TYPE "daily_storage_session_enum" AS ENUM('morning', 'noon', 'afternoon', 'evening')`);
        await queryRunner.query(`CREATE TABLE "daily_storage" ("dailyStorageId" SERIAL NOT NULL, "day" date NOT NULL, "session" "daily_storage_session_enum", "dailyDishDetailDailyStorageId" integer, "dailyDishDetailDishId" integer, CONSTRAINT "PK_06a80c94a982b0fdcdcb9dc5fcc" PRIMARY KEY ("dailyStorageId"))`);
        await queryRunner.query(`CREATE TYPE "daily_dish_detail_status_enum" AS ENUM('in-stock', 'out-of-range')`);
        await queryRunner.query(`CREATE TABLE "daily_dish_detail" ("status" "daily_dish_detail_status_enum" NOT NULL DEFAULT 'out-of-range', "price" double precision NOT NULL DEFAULT 0, "dailyStorageId" integer NOT NULL, "dishId" integer NOT NULL, CONSTRAINT "PK_f0aa5d4e7f6d8ad03b7ce71947d" PRIMARY KEY ("dailyStorageId", "dishId"))`);
        await queryRunner.query(`ALTER TABLE "dish" ADD "dailyDishDetailDailyStorageId" integer`);
        await queryRunner.query(`ALTER TABLE "dish" ADD "dailyDishDetailDishId" integer`);
        await queryRunner.query(`ALTER TABLE "dish" DROP COLUMN "defaultPrice"`);
        await queryRunner.query(`ALTER TABLE "dish" ADD "defaultPrice" double precision NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "daily_storage" ADD CONSTRAINT "FK_ec9447ae4566d1d467ea7cacd97" FOREIGN KEY ("dailyDishDetailDailyStorageId", "dailyDishDetailDishId") REFERENCES "daily_dish_detail"("dailyStorageId","dishId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dish" ADD CONSTRAINT "FK_543636dbfcf623863159bf280d1" FOREIGN KEY ("dailyDishDetailDailyStorageId", "dailyDishDetailDishId") REFERENCES "daily_dish_detail"("dailyStorageId","dishId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "dish" DROP CONSTRAINT "FK_543636dbfcf623863159bf280d1"`);
        await queryRunner.query(`ALTER TABLE "daily_storage" DROP CONSTRAINT "FK_ec9447ae4566d1d467ea7cacd97"`);
        await queryRunner.query(`ALTER TABLE "dish" DROP COLUMN "defaultPrice"`);
        await queryRunner.query(`ALTER TABLE "dish" ADD "defaultPrice" integer NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "dish" DROP COLUMN "dailyDishDetailDishId"`);
        await queryRunner.query(`ALTER TABLE "dish" DROP COLUMN "dailyDishDetailDailyStorageId"`);
        await queryRunner.query(`DROP TABLE "daily_dish_detail"`);
        await queryRunner.query(`DROP TYPE "daily_dish_detail_status_enum"`);
        await queryRunner.query(`DROP TABLE "daily_storage"`);
        await queryRunner.query(`DROP TYPE "daily_storage_session_enum"`);
    }

}
