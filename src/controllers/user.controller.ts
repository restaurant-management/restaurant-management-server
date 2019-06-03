import {NextFunction, Request, Response} from 'express';
import {Permission} from '../entities/Permission';
import {User} from '../entities/User';
import {checkUserPermission} from '../helpers/authorize';
import * as UserService from '../services/user.service';

const register = async (req: Request, res: Response, next: NextFunction) => {
    UserService.createUser(req.body.username,
        req.body.email, req.body.password, req.body.fullName, req.body.birthday, req.body.avatar).then((user) => {
            return res.status(200).json(user);
        }).catch(err => next(err));
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    UserService.authenticate(req.body.usernameOrEmail, req.body.password).then(token => {
        return res.status(200).json(token);
    }).catch(err => next(err));
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    UserService.getAll(req.query.length, req.query.offset).then(value => {
        return res.status(200).json(value);
    }).catch(err => {
        next(err);
    })
};

const getByUuid = async (req: Request, res: Response, next: NextFunction) => {
    if (!checkUserPermission(req['user'] as User, Permission.UserManagement) &&
        (req['user'] as User).uuid != req.params.uuid) {
        return next(new Error('Unauthorized'));
    }
    UserService.getByUuid(req.params.uuid).then(value => {
        return res.status(200).json(value);
    }).catch(err => next(err));
};

const getByUsername = async (req: Request, res: Response, next: NextFunction) => {
    if (!checkUserPermission(req['user'] as User, Permission.UserManagement) &&
        (req['user'] as User).userName != req.params.username) {
        return next(new Error('Unauthorized'));
    }
    UserService.getByUsername(req.params.username).then(value => {
        return res.status(200).json(value);
    }).catch(err => next(err));
};

const getByEmail = async (req: Request, res: Response, next: NextFunction) => {
    if (!checkUserPermission(req['user'] as User, Permission.UserManagement) &&
        (req['user'] as User).email != req.params.email) {
        return next(new Error('Unauthorized'));
    }
    UserService.getByEmail(req.params.email).then(value => {
        return res.status(200).json(value);
    }).catch(err => next(err));
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    UserService.deleteUser(req.params.username).then(() => {
        return res.status(200).json({message: 'Delete success.'});
    }).catch(e => next(e));
};

const editProfile = async (req: Request, res: Response, next: NextFunction) => {
    if (!checkUserPermission(req['user'] as User, Permission.UserManagement) &&
        (req['user'] as User).userName != req.params.username) {
        return next(new Error('Unauthorized'));
    }

    UserService.editProfile(req.params.username, req.body.email, req.body.fullName, 
        req.body.birthday, req.body.avatar)
        .then((user) => {
            return res.status(200).json(user);
        }).catch(e => next(e));
};

const editPassword = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.body.newPassword) return next(new Error('New password is required.'));

    if (!checkUserPermission(req['user'] as User, Permission.UserManagement) &&
        (req['user'] as User).userName != req.params.username) {
        return next(new Error('Unauthorized'));
    }

    // If user don't have permission, user need to be himself and supply correctly old
    // password to add new password.
    if(!checkUserPermission(req['user'] as User, Permission.UserManagement)){
        if((req['user'] as User).userName == req.params.username) {
            if(!req.body.oldPassword) return next(new Error('Old password is required.'));
            if(!await UserService.checkCorrectPassword(req.params.username, req.body.oldPassword)){
                return next(new Error('Password is not correct.'));
            }
        }
    }

    UserService.editPassword(req.params.username, req.body.newPassword).then(() => {
        return res.status(200).json({message: 'Change password success.'});
    }).catch(e => next(e));;
};

const getAllPermissions = (req: Request, res: Response,  next: NextFunction) => { 
    if (!checkUserPermission(req['user'] as User, Permission.UserManagement) &&
        (req['user'] as User).userName != req.params.username) {
        return next(new Error('Unauthorized'));
    }

    UserService.getAllPermissions(req.params.username).then(user => {
        return res.status(200).json(user);
    }).catch(e => next(e))
}

const setPermission = (req: Request, res: Response,  next: NextFunction) => {
    UserService.setPermission(req.params.username, req.body.permissions).then(user => {
        return res.status(200).json(user);
    }).catch(e => next(e))
};

const addPermission = (req: Request, res: Response,  next: NextFunction) => {
    UserService.addPermission(req.params.username, req.params.permission).then(user => {
        return res.status(200).json(user);
    }).catch(e => next(e))
};

const removePermission = (req: Request, res: Response,  next: NextFunction) => {
    UserService.removePermission(req.params.username, req.params.permission).then(user => {
        return res.status(200).json(user);
    }).catch(e => next(e))
};

const changeRole = (req: Request, res: Response,  next: NextFunction) => {
    UserService.changeRole(req.params.username, req.params.role).then(user => {
        return res.status(200).json(user);
    }).catch(e => next(e))
};

export {register, login, getAll, getByUuid, getByUsername, getByEmail, editPassword,
    deleteUser, editProfile, setPermission, addPermission, removePermission, changeRole, getAllPermissions}


