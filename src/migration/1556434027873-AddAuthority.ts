import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAuthority1556434027873 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "authority" ("authorityId" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "Description" character varying, CONSTRAINT "PK_cb579d9f4f2935b0327c8a089fb" PRIMARY KEY ("authorityId"))`);
        await queryRunner.query(`CREATE TABLE "group_user_authorities_authority" ("groupUserGroupId" integer NOT NULL, "authorityAuthorityId" integer NOT NULL, CONSTRAINT "PK_bebc4d8f48a82a257a578102bb5" PRIMARY KEY ("groupUserGroupId", "authorityAuthorityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ec7dccfeae66f3019296866171" ON "group_user_authorities_authority" ("groupUserGroupId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b2f74849e9af0cb084d1e0deb0" ON "group_user_authorities_authority" ("authorityAuthorityId") `);
        await queryRunner.query(`ALTER TABLE "group_user_authorities_authority" ADD CONSTRAINT "FK_ec7dccfeae66f3019296866171e" FOREIGN KEY ("groupUserGroupId") REFERENCES "group_user"("groupId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_user_authorities_authority" ADD CONSTRAINT "FK_b2f74849e9af0cb084d1e0deb0b" FOREIGN KEY ("authorityAuthorityId") REFERENCES "authority"("authorityId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "group_user_authorities_authority" DROP CONSTRAINT "FK_b2f74849e9af0cb084d1e0deb0b"`);
        await queryRunner.query(`ALTER TABLE "group_user_authorities_authority" DROP CONSTRAINT "FK_ec7dccfeae66f3019296866171e"`);
        await queryRunner.query(`DROP INDEX "IDX_b2f74849e9af0cb084d1e0deb0"`);
        await queryRunner.query(`DROP INDEX "IDX_ec7dccfeae66f3019296866171"`);
        await queryRunner.query(`DROP TABLE "group_user_authorities_authority"`);
        await queryRunner.query(`DROP TABLE "authority"`);
    }

}
