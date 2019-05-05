import jwt from 'jsonwebtoken';
import {Permission} from '../entities/Permission';
import {Role} from '../entities/Role';
import {User} from '../entities/User';
import * as passwordHandler from '../helpers/passwordHandler';

const getAll = async (length?: number, offset?: number) => {
    const users = await User.find({relations: ['role'], take: length, skip: offset});
    return users.map((user) => {
        const {password, userId, ...userWithoutPassword} = user;
        return userWithoutPassword;
    })
};

const getByUuid = async (uuid: string) => {
    const user = await User.findOne({where: {uuid}});
    if (!user) throw new Error('Not found.');
    const {password, ...userWithoutPassword} = user;
    return userWithoutPassword;
};

const getByUsername = async (username: string) => {
    const user = await User.findOne({where: {userName: username}});
    if (!user) throw new Error('Not found.');
    const {password, ...userWithoutPassword} = user;
    return userWithoutPassword;
};

const getByEmail = async (email: string) => {
    const user = await User.findOne({where: {email}});
    if (!user) throw new Error('Not found.');
    const {password, ...userWithoutPassword} = user;
    return userWithoutPassword;
};

const authenticate = async (usernameOrEmail: string, password: string) => {
    let user = await User.findOne({where: {userName: usernameOrEmail}});
    if (!user) {
        user = await User.findOne({where: {email: usernameOrEmail}});
    }

    if (user) {
        if (!passwordHandler.compare(password, user.password)) throw new Error('Password incorrect.');

        return jwt.sign({uuid: user.uuid}, process.env.JWT_SECRET_KEY, {expiresIn: '15 days'});
    }
    throw new Error('Username or email incorrect.');
};

const createUser = async (_username: string, _email: string, _password: string, _fullName?: string, _birthday?: Date) => {
    const userSameUsername = await User.findOne({where: {userName: _username}});
    const userSameEmail = await User.findOne({where: {email: _email}});
    if (userSameUsername || userSameEmail) {
        throw new Error('Username/email has already used.');
    }

    let newUser = new User();
    newUser.userName = _username;
    newUser.email = _email;
    newUser.password = passwordHandler.encode(_password);
    newUser.fullName = _fullName;
    newUser.birthday = _birthday;
    newUser.role = await Role.findOne({where: {slug: 'user'}});

    const user = await newUser.save();
    if (!user) throw new Error('Register failed.');
    const {password, userId, ...userWithoutPassword} = user;
    return userWithoutPassword;
};

const deleteUser = async (username: string) => {
    if(username === 'admin') throw new Error('Can\'t delete default admin user.');
    const user = await User.findOne({where: {userName: username}, relations: ['role']});

    if (!user) throw new Error('User not found.');
    if (user.role.slug === 'administrator') throw new Error('Can\'t delete user is administrator.');

    await user.remove();
};

const editProfile = async (username: string, newEmail?: string, newFullName?: string, newBirthday?: Date) => {
    const user = await User.findOne({where: {userName: username}});

    if (!user) throw new Error('User not found.');

    if (newEmail) user.email = newEmail;
    if (newFullName) user.fullName = newFullName;
    if (newBirthday) user.birthday = newBirthday;

    const saved = await user.save();
    if (!saved) throw new Error('Edit user profile failed.');
    const {password, userId, ...userWithoutPassword} = saved;
    return userWithoutPassword;
};

const addPermission = async (username: string, permission: string) => {
    if (Object.keys(Permission).map(value => Permission[value]).indexOf(permission) < 0)
        throw new Error('Permission not found.');

    let user = await User.findOne({where: {userName: username}});
    if (!user.permissions) user.permissions = [];
    user.permissions.push(permission);
    const saved = await user.save();
    if (!saved) throw new Error('Add permission failed.');
    return saved;
};

const removePermission = async (username: string, permission: string) => {
    let user = await User.findOne({where: {userName: username}});
    if (!user) throw new Error('User not found.');
    let index = user.permissions.indexOf(permission);
    if (index > -1) user.permissions.splice(index, 1);
    const saved = await user.save();
    if (!saved) throw new Error('Remove permission failed.');
    return saved;
};

const changeRole = async (username: string, roleSlug: string) => {
    if (username === 'admin') throw new Error('Can\'t change role for user admin default.');

    const role = await Role.findOne({where: {slug: roleSlug}});
    if (!role) throw new Error('Role not found.');

    const user = await User.findOne({where: {userName: username}});
    if (!user) throw new Error('User not found.');

    user.role = role;

    const saved = await user.save();
    if (!saved) throw new Error('Change role failed.');
    return saved;
};

export {
    getAll,
    getByUuid,
    authenticate,
    createUser,
    getByEmail,
    getByUsername,
    deleteUser,
    editProfile,
    addPermission,
    removePermission,
    changeRole
};
