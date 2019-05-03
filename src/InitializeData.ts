import {getConnection} from 'typeorm';
import {Permission} from './entities/Permission';
import {Role} from './entities/Role';
import {User} from './entities/User';
import * as passwordHandler from './helpers/passwordHandler';

const initializeData = async () => {
    /**
     * Check initialized data or not.
     */
    const [, roleCount] = await Role.findAndCount();
    const [, userCount] = await User.findAndCount();

    /**
     * Initialize Role
     */
    if (roleCount <= 0)
        await getConnection().createQueryBuilder()
            .insert().into(Role)
            .values([
                {slug: 'user', name: 'User'},
                {
                    slug: 'administrator', name: 'Administrator', permissions: [
                        Permission.CreateBill, Permission.DailyStorageManagement,
                        Permission.DeleteBill, Permission.DishManagement,
                        Permission.EditBill, Permission.RoleManagement,
                        Permission.UpdateBillStatus, Permission.UserManagement
                    ]
                }
            ]).execute();

    /**
     * Initialize User
     */
    if (userCount <= 0) {
        let newUser = new User();
        newUser.userName = 'admin';
        newUser.password = passwordHandler.encode('admin');
        newUser.email = 'hienlh1298@gmail.com';
        newUser.role = await Role.findOne({where: {slug: 'administrator'}});
        await newUser.save();
    }
};

export default initializeData;
