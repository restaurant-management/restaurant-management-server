import {MigrationInterface, QueryRunner} from "typeorm";

export class EditUserRenameGroupIdToGroup1556434236807 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_54ab1825c1859c5cf53e1af7473"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "groupIdGroupId" TO "groupGroupId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_d523facf61d533a8bb8cd698256" FOREIGN KEY ("groupGroupId") REFERENCES "group_user"("groupId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_d523facf61d533a8bb8cd698256"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "groupGroupId" TO "groupIdGroupId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_54ab1825c1859c5cf53e1af7473" FOREIGN KEY ("groupIdGroupId") REFERENCES "group_user"("groupId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
