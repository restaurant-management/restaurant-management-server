import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1556559759541 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "daily_storage" ("dailyStorageId" SERIAL NOT NULL, "day" date NOT NULL, "session" "daily_storage_session_enum", "dailyDishDetailDailyStorageId" integer, "dailyDishDetailDishId" integer, CONSTRAINT "PK_06a80c94a982b0fdcdcb9dc5fcc" PRIMARY KEY ("dailyStorageId"))`);
        await queryRunner.query(`CREATE TABLE "daily_dish_detail" ("status" "daily_dish_detail_status_enum" NOT NULL DEFAULT 'out-of-range', "price" double precision NOT NULL DEFAULT 0, "dailyStorageId" integer NOT NULL, "dishId" integer NOT NULL, CONSTRAINT "PK_f0aa5d4e7f6d8ad03b7ce71947d" PRIMARY KEY ("dailyStorageId", "dishId"))`);
        await queryRunner.query(`CREATE TABLE "dish" ("dishId" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" character varying, "images" text array NOT NULL, "defaultPrice" double precision NOT NULL DEFAULT 0, "dailyDishDetailDailyStorageId" integer, "dailyDishDetailDishId" integer, CONSTRAINT "PK_bfaea55c34eed191cac380642ee" PRIMARY KEY ("dishId"))`);
        await queryRunner.query(`CREATE TABLE "bill_detail" ("billId" integer NOT NULL, "dishId" integer NOT NULL, "quantity" integer NOT NULL DEFAULT 0, CONSTRAINT "PK_0e3ebed9afb7615f099dd269be0" PRIMARY KEY ("billId", "dishId"))`);
        await queryRunner.query(`CREATE TABLE "permission" ("permissionId" SERIAL NOT NULL, "slug" character varying NOT NULL, "name" character varying(100) NOT NULL, "Description" character varying, CONSTRAINT "UQ_3379e3b123dac5ec10734b8cc86" UNIQUE ("slug"), CONSTRAINT "PK_86b314be9c1be5c62b3a9d97ae4" PRIMARY KEY ("permissionId"))`);
        await queryRunner.query(`CREATE TABLE "role" ("roleId" SERIAL NOT NULL, "slug" character varying NOT NULL, "name" character varying(100) NOT NULL, "description" character varying, CONSTRAINT "UQ_35c9b140caaf6da09cfabb0d675" UNIQUE ("slug"), CONSTRAINT "PK_703705ba862c2bb45250962c9e1" PRIMARY KEY ("roleId"))`);
        await queryRunner.query(`CREATE TABLE "user" ("userId" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "userName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "fullName" character varying(100), "birthday" date, "point" integer NOT NULL DEFAULT 0, "roleRoleId" integer, CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "bill" ("billId" SERIAL NOT NULL, "day" date NOT NULL, "userUserId" integer, CONSTRAINT "PK_ded105d396cc380a858a4eed38c" PRIMARY KEY ("billId"))`);
        await queryRunner.query(`CREATE TABLE "role_permissions_permission" ("roleRoleId" integer NOT NULL, "permissionPermissionId" integer NOT NULL, CONSTRAINT "PK_dae0c8ab7202c311e458d6f6dfe" PRIMARY KEY ("roleRoleId", "permissionPermissionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dc0d62be37f85731141d855bfd" ON "role_permissions_permission" ("roleRoleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_841e12f32191ecf470a7a48279" ON "role_permissions_permission" ("permissionPermissionId") `);
        await queryRunner.query(`CREATE TABLE "user_permissions_permission" ("userUserId" integer NOT NULL, "permissionPermissionId" integer NOT NULL, CONSTRAINT "PK_fd09290369f985250e3c3f22846" PRIMARY KEY ("userUserId", "permissionPermissionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4948790383256051b2a3c48b9b" ON "user_permissions_permission" ("userUserId") `);
        await queryRunner.query(`CREATE INDEX "IDX_37d75c838d31eae64f7b5ea6a2" ON "user_permissions_permission" ("permissionPermissionId") `);
        await queryRunner.query(`ALTER TABLE "daily_storage" ADD CONSTRAINT "FK_ec9447ae4566d1d467ea7cacd97" FOREIGN KEY ("dailyDishDetailDailyStorageId", "dailyDishDetailDishId") REFERENCES "daily_dish_detail"("dailyStorageId","dishId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dish" ADD CONSTRAINT "FK_543636dbfcf623863159bf280d1" FOREIGN KEY ("dailyDishDetailDailyStorageId", "dailyDishDetailDishId") REFERENCES "daily_dish_detail"("dailyStorageId","dishId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bill_detail" ADD CONSTRAINT "FK_6b583a18f101b04a31154f02601" FOREIGN KEY ("billId") REFERENCES "bill"("billId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bill_detail" ADD CONSTRAINT "FK_e08fed1a4e7444261edf0d282d1" FOREIGN KEY ("dishId") REFERENCES "dish"("dishId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_ffe3092db843bd8f90fcfe97da7" FOREIGN KEY ("roleRoleId") REFERENCES "role"("roleId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bill" ADD CONSTRAINT "FK_e038999e760ba13d4dc70b66884" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_permissions_permission" ADD CONSTRAINT "FK_dc0d62be37f85731141d855bfd1" FOREIGN KEY ("roleRoleId") REFERENCES "role"("roleId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_permissions_permission" ADD CONSTRAINT "FK_841e12f32191ecf470a7a48279e" FOREIGN KEY ("permissionPermissionId") REFERENCES "permission"("permissionId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_permissions_permission" ADD CONSTRAINT "FK_4948790383256051b2a3c48b9bf" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_permissions_permission" ADD CONSTRAINT "FK_37d75c838d31eae64f7b5ea6a20" FOREIGN KEY ("permissionPermissionId") REFERENCES "permission"("permissionId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_permissions_permission" DROP CONSTRAINT "FK_37d75c838d31eae64f7b5ea6a20"`);
        await queryRunner.query(`ALTER TABLE "user_permissions_permission" DROP CONSTRAINT "FK_4948790383256051b2a3c48b9bf"`);
        await queryRunner.query(`ALTER TABLE "role_permissions_permission" DROP CONSTRAINT "FK_841e12f32191ecf470a7a48279e"`);
        await queryRunner.query(`ALTER TABLE "role_permissions_permission" DROP CONSTRAINT "FK_dc0d62be37f85731141d855bfd1"`);
        await queryRunner.query(`ALTER TABLE "bill" DROP CONSTRAINT "FK_e038999e760ba13d4dc70b66884"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_ffe3092db843bd8f90fcfe97da7"`);
        await queryRunner.query(`ALTER TABLE "bill_detail" DROP CONSTRAINT "FK_e08fed1a4e7444261edf0d282d1"`);
        await queryRunner.query(`ALTER TABLE "bill_detail" DROP CONSTRAINT "FK_6b583a18f101b04a31154f02601"`);
        await queryRunner.query(`ALTER TABLE "dish" DROP CONSTRAINT "FK_543636dbfcf623863159bf280d1"`);
        await queryRunner.query(`ALTER TABLE "daily_storage" DROP CONSTRAINT "FK_ec9447ae4566d1d467ea7cacd97"`);
        await queryRunner.query(`DROP INDEX "IDX_37d75c838d31eae64f7b5ea6a2"`);
        await queryRunner.query(`DROP INDEX "IDX_4948790383256051b2a3c48b9b"`);
        await queryRunner.query(`DROP TABLE "user_permissions_permission"`);
        await queryRunner.query(`DROP INDEX "IDX_841e12f32191ecf470a7a48279"`);
        await queryRunner.query(`DROP INDEX "IDX_dc0d62be37f85731141d855bfd"`);
        await queryRunner.query(`DROP TABLE "role_permissions_permission"`);
        await queryRunner.query(`DROP TABLE "bill"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "permission"`);
        await queryRunner.query(`DROP TABLE "bill_detail"`);
        await queryRunner.query(`DROP TABLE "dish"`);
        await queryRunner.query(`DROP TABLE "daily_dish_detail"`);
        await queryRunner.query(`DROP TABLE "daily_storage"`);
    }

}
