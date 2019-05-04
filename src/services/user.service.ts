import jwt from 'jsonwebtoken';
import {Role} from '../entities/Role';
import {User} from '../entities/User';
import * as passwordHandler from '../helpers/passwordHandler';

const getAll = async () => {
    const users = await User.find({relations: ['role']});
    return users.map((user) => {
        const {password, userId, ...userWithoutPassword} = user;
        return userWithoutPassword;
    })
};

const getByUuid = async (uuid: string) => {
    const user = await User.findOne({where: {uuid}});
    if (!user) return {};
    const {password, ...userWithoutPassword} = user;
    return userWithoutPassword;
};

const authenticate = async (usernameOrEmail: string, password: string) => {
    let user = await User.findOne({where: {userName: usernameOrEmail}});
    if (!user) {
        user = await User.findOne({where: {email: usernameOrEmail}});
    }

    if (user) {
        if (!passwordHandler.compare(password, user.password)) return {};

        const token = jwt.sign({uuid: user.uuid}, process.env.JWT_SECRET_KEY, {expiresIn: '15 days'});
        return {
            token
        }
    }
};

const createUser = async (_username: string, _email: string, _password: string, _fullName?: string, _birthday?: Date) => {
    const userSameUsername = await User.findOne({where: {userName: _username}});
    const userSameEmail = await User.findOne({where: {email: _email}});
    if (userSameUsername || userSameEmail) {
        return {};
    }

    let newUser = new User();
    newUser.userName = _username;
    newUser.email = _email;
    newUser.password = passwordHandler.encode(_password);
    newUser.fullName = _fullName;
    newUser.birthday = _birthday;
    newUser.role = await Role.findOne({where: {slug: 'user'}});

    const user = await newUser.save();
    const {password, userId, ...userWithoutPassword} = user;
    return {
        user: userWithoutPassword
    }
};

export {
    getAll,
    getByUuid,
    authenticate,
    createUser
};
