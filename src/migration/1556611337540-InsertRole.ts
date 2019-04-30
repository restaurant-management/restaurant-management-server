import {MigrationInterface, QueryRunner} from "typeorm";
import {Permission} from '../entity/Permission';
import {Role} from '../entity/Role';

export class InsertRole1556611337540 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.manager.createQueryBuilder()
            .insert().into(Role)
            .values([
                {
                    slug: 'admin', name: 'Admin', permissions: [
                        Permission.FullRolePermission,
                        Permission.FullUserPermission,
                        Permission.FullBillPermission,
                        Permission.FullDishPermission,
                        Permission.FullDailyStoragePermission
                    ]
                },
                {slug: 'user', name: 'User'}
            ]).execute();
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.manager.createQueryBuilder()
            .delete().from(Role)
            .where('slug = :slug1', {slug1: 'admin'})
            .orWhere('slug = :slug2', {slug2: 'user'})
            .execute();
    }

}
