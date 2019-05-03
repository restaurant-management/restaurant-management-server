import {NextFunction, Request, Response} from 'express';
import {Permission} from '../entities/Permission';
import {User} from '../entities/User';
import {checkUserPermission} from '../helpers/authorize';
import * as UserService from '../services/user.service';

const register = async (req: Request, res: Response, _next: NextFunction) => {
    let result = await UserService.createUser(req.body.username,
        req.body.email, req.body.password, req.body.fullName, req.body.birthday);

    if (!result.user) {
        return res.status(401).json({message: 'Username/email has already used.'})
    }

    return res.status(200).json({user: result.user});
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    UserService.authenticate(req.body.usernameOrEmail, req.body.password).then(result => {
        if (result.token) {
            return res.status(200).json({token: result.token});
        } else return res.status(400).json({message: 'Username/Email or password is incorrect'});
    }).catch(err => next(err));
};

const getAll = async (_req: Request, res: Response, next: NextFunction) => {
    UserService.getAll().then(value => {
        return res.status(200).json(value);
    }).catch(err => {
        next(err);
    })
};

const getByUuid = async (req: Request, res: Response, next: NextFunction) => {
    if (!checkUserPermission(req['user'] as User, Permission.UserManagement) &&
        (req['user'] as User).uuid != req.params.uuid) {
        return res.status(401).json({message: 'Unauthorized'});
    }
    UserService.getByUuid(req.params.uuid).then(value => {
        return res.status(200).json(value);
    }).catch(err => next(err));
};

export {register, login, getAll, getByUuid}


