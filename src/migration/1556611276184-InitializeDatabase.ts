import {MigrationInterface, QueryRunner} from "typeorm";

export class InitializeDatabase1556611276184 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TYPE "daily_storage_session_enum" AS ENUM('morning', 'noon', 'afternoon', 'evening')`);
        await queryRunner.query(`CREATE TABLE "daily_storage" ("dailyStorageId" SERIAL NOT NULL, "day" date NOT NULL, "session" "daily_storage_session_enum", "dailyDishDetailDailyStorageId" integer, "dailyDishDetailDishId" integer, CONSTRAINT "PK_06a80c94a982b0fdcdcb9dc5fcc" PRIMARY KEY ("dailyStorageId"))`);
        await queryRunner.query(`CREATE TYPE "daily_dish_detail_status_enum" AS ENUM('in-stock', 'out-of-range')`);
        await queryRunner.query(`CREATE TABLE "daily_dish_detail" ("status" "daily_dish_detail_status_enum" NOT NULL DEFAULT 'out-of-range', "price" double precision NOT NULL DEFAULT 0, "dailyStorageId" integer NOT NULL, "dishId" integer NOT NULL, CONSTRAINT "PK_f0aa5d4e7f6d8ad03b7ce71947d" PRIMARY KEY ("dailyStorageId", "dishId"))`);
        await queryRunner.query(`CREATE TABLE "dish" ("dishId" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" character varying, "images" text array NOT NULL, "defaultPrice" double precision NOT NULL DEFAULT 0, "dailyDishDetailDailyStorageId" integer, "dailyDishDetailDishId" integer, CONSTRAINT "PK_bfaea55c34eed191cac380642ee" PRIMARY KEY ("dishId"))`);
        await queryRunner.query(`CREATE TABLE "bill_detail" ("billId" integer NOT NULL, "dishId" integer NOT NULL, "quantity" integer NOT NULL DEFAULT 0, CONSTRAINT "PK_0e3ebed9afb7615f099dd269be0" PRIMARY KEY ("billId", "dishId"))`);
        await queryRunner.query(`CREATE TABLE "role" ("roleId" SERIAL NOT NULL, "slug" character varying NOT NULL, "name" character varying(100) NOT NULL, "description" character varying, "permissions" text array, CONSTRAINT "UQ_35c9b140caaf6da09cfabb0d675" UNIQUE ("slug"), CONSTRAINT "PK_703705ba862c2bb45250962c9e1" PRIMARY KEY ("roleId"))`);
        await queryRunner.query(`CREATE TABLE "user" ("userId" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "userName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "fullName" character varying(100), "birthday" date, "point" integer NOT NULL DEFAULT 0, "permissions" text array NOT NULL, "roleRoleId" integer, CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TYPE "bill_status_enum" AS ENUM('preparing', 'prepare-done', 'delivering', 'shipping', 'complete')`);
        await queryRunner.query(`CREATE TABLE "bill" ("billId" SERIAL NOT NULL, "day" date NOT NULL, "status" "bill_status_enum" NOT NULL DEFAULT 'preparing', "userUserId" integer, CONSTRAINT "PK_ded105d396cc380a858a4eed38c" PRIMARY KEY ("billId"))`);
        await queryRunner.query(`ALTER TABLE "daily_storage" ADD CONSTRAINT "FK_ec9447ae4566d1d467ea7cacd97" FOREIGN KEY ("dailyDishDetailDailyStorageId", "dailyDishDetailDishId") REFERENCES "daily_dish_detail"("dailyStorageId","dishId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dish" ADD CONSTRAINT "FK_543636dbfcf623863159bf280d1" FOREIGN KEY ("dailyDishDetailDailyStorageId", "dailyDishDetailDishId") REFERENCES "daily_dish_detail"("dailyStorageId","dishId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bill_detail" ADD CONSTRAINT "FK_6b583a18f101b04a31154f02601" FOREIGN KEY ("billId") REFERENCES "bill"("billId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bill_detail" ADD CONSTRAINT "FK_e08fed1a4e7444261edf0d282d1" FOREIGN KEY ("dishId") REFERENCES "dish"("dishId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_ffe3092db843bd8f90fcfe97da7" FOREIGN KEY ("roleRoleId") REFERENCES "role"("roleId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bill" ADD CONSTRAINT "FK_e038999e760ba13d4dc70b66884" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "bill" DROP CONSTRAINT "FK_e038999e760ba13d4dc70b66884"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_ffe3092db843bd8f90fcfe97da7"`);
        await queryRunner.query(`ALTER TABLE "bill_detail" DROP CONSTRAINT "FK_e08fed1a4e7444261edf0d282d1"`);
        await queryRunner.query(`ALTER TABLE "bill_detail" DROP CONSTRAINT "FK_6b583a18f101b04a31154f02601"`);
        await queryRunner.query(`ALTER TABLE "dish" DROP CONSTRAINT "FK_543636dbfcf623863159bf280d1"`);
        await queryRunner.query(`ALTER TABLE "daily_storage" DROP CONSTRAINT "FK_ec9447ae4566d1d467ea7cacd97"`);
        await queryRunner.query(`DROP TABLE "bill"`);
        await queryRunner.query(`DROP TYPE "bill_status_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "bill_detail"`);
        await queryRunner.query(`DROP TABLE "dish"`);
        await queryRunner.query(`DROP TABLE "daily_dish_detail"`);
        await queryRunner.query(`DROP TYPE "daily_dish_detail_status_enum"`);
        await queryRunner.query(`DROP TABLE "daily_storage"`);
        await queryRunner.query(`DROP TYPE "daily_storage_session_enum"`);
    }

}
