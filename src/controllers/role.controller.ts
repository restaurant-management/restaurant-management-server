import {NextFunction, Request, Response} from 'express';
import * as RoleService from '../services/role.service';

const create = (req: Request, res: Response, next: NextFunction) => {
    RoleService.create(req.body.name, req.body.slug,
        req.body.description, req.body.permissions).then(role => {
        return res.status(200).json(role);
    }).catch(err => next(err));
};

const getAll = (_req: Request, res: Response, next: NextFunction) => {
    RoleService.getAll().then(roles => {
        return res.status(200).json(roles);
    }).catch(err => next(err))
};

const deleteRole = (req: Request, res: Response, next: NextFunction) => {
    RoleService.deleteRole(req.params.slug).then(() => {
        return res.status(200).json({message: 'Delete success.'});
    }).catch(e => next(e))
};

const getBySlug = (req: Request, res: Response, next: NextFunction) => {
    RoleService.findBySlug(req.params.slug).then(role => {
        return res.status(200).json(role);
    }).catch(e => next(e));
};

const update = (req: Request, res: Response,  next: NextFunction) => {
    RoleService.update(req.params.slug, req.body.slug, req.body.name, req.body.description).then(role => {
        return res.status(200).json(role);
    }).catch(e => next(e))
};

const setPermission = (req: Request, res: Response,  next: NextFunction) => {
    RoleService.setPermission(req.params.slug, req.body.permissions).then(role => {
        return res.status(200).json(role);
    }).catch(e => next(e))
};

const addPermission = (req: Request, res: Response,  next: NextFunction) => {
    RoleService.addPermission(req.params.slug, req.params.permission).then(role => {
        return res.status(200).json(role);
    }).catch(e => next(e))
};

const removePermission = (req: Request, res: Response,  next: NextFunction) => {
    RoleService.removePermission(req.params.slug, req.params.permission).then(role => {
        return res.status(200).json(role);
    }).catch(e => next(e))
};

export {create, getAll, deleteRole, getBySlug, update, setPermission, addPermission, removePermission}
