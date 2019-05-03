import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {User} from '../entities/User';

/**
 * Default export function to check permission.
 */
const authorize = (permission?: string | string[]) => {
    return [
        /**
         * Authenticate function.
         */
        (req: Request, res: Response, next: NextFunction) => {
            let token = req.headers['authorization'];

            if (!token)
                return res.status(401).json({message: 'No token provided.'});

            jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
                if (err)
                    next(err);

                let user = await User.findOne({
                    where: {uuid: decoded['uuid']},
                    relations: ['role']
                });

                if (!user) return res.status(500).json({
                    message: 'Failed to authenticate token.'
                });

                const {password, ...userWithoutPassword} = user;

                req['user'] = userWithoutPassword;
                next();
            })
        },

        /**
         * Authorize function.
         */
        async (req: Request, res: Response, next: NextFunction) => {
            const currentUser = req['user'] as User;

            if (!currentUser) return;

            if (!checkUserPermission(currentUser, permission)) {
                return res.status(401).json({message: 'Unauthorized'});
            }
            next();
        },

    ];
};

export default authorize;

export const checkUserPermission = (user: User, permission: string | string[]): boolean => {
    const extraPermissions = user.permissions || [];
    const rolePermissions = user.role.permissions || [];

    const userPermissions = [...extraPermissions, ...rolePermissions];
    if (typeof permission === 'string') {
        return checkPermission(permission, userPermissions);
    } else if (permission) {
        return checkMultiplePermission(permission, userPermissions);
    } else return true;
};

/**
 * Internal function: User Permissions have a permission, don't they?
 */
const checkPermission = (permission: string, userPermissions: string[]): boolean => {
    return !!userPermissions.find(userPermission => permission === userPermission);
};

/**
 * Internal function: User Permissions have some permissions, don't they?
 */
const checkMultiplePermission = (permissions: string[], userPermissions: string[]): boolean => {
    permissions.forEach(permission => {
        if (!checkPermission(permission, userPermissions)) return false;
    });
    return true;
};
