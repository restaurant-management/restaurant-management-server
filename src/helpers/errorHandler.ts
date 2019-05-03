import {Request, Response, NextFunction} from 'express';

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
    if (typeof (err) === 'string') {
        return res.status(400).json({message: err});
    }

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({message: 'Invalid Token.'});
    }

    return res.status(500).json({message: err.message})
};
