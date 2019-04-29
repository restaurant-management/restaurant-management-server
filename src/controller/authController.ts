import {NextFunction, Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {User} from '../entity/User';

export const register = async (req: Request, res: Response, _next: NextFunction) => {
    if (await User.findOne({where: {userName: req.body.userName}})) {
        res.status(401).send({
            auth: false,
            message: 'UserName was already used'
        })
    }

    if (await User.findOne({where: {email: req.body.email}})) {
        res.status(401).send({
            auth: false,
            message: 'Email was already used'
        })
    }

    let hashedPassword = bcrypt.hashSync(req.body.password, 8);

    let newUser = new User();
    newUser.email = req.body.email;
    newUser.userName = req.body.userName;
    newUser.password = hashedPassword;

    newUser.save().then((user) => {
        res.status(200).send({
            message: `Register ${user.userName} success.`
        })
    });
};

export const login = async (req: Request, res: Response, _next: NextFunction) => {
    let user;
    if (req.body.userName) {
        user = await User.findOne({where: {userName: req.body.userName}});
    } else if (req.body.email) {
        user = await User.findOne({where: {email: req.body.email}});
    } else res.status(401).send({
        auth: false,
        message: 'Authentication failed. Missing username or email.'
    });

    if (!user) res.status(401).send({
        auth: false,
        message: 'Authentication failed. User not found.'
    });

    if (!bcrypt.compareSync(req.body.password, user.password)) {
        res.status(401).send({
            auth: false,
            message: 'Authentication failed. Wrong password.'
        })
    }

    let token = jwt.sign({uuid: user.uuid}, process.env.JWT_SECRET_KEY, {expiresIn: '15 days'});
    res.status(200).send({
        auth: true,
        token: token
    });
};

/**
 * After verify token success, request will have user attribute. Use it by call req['user']
 */
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers['authorization'];

    if (!token)
        return res.status(401).send({auth: false, message: 'No token provided.'});

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
        if (err)
            return res.status(500).send({
                auth: false,
                message: 'Failed to authenticate token.'
            });

        let user = await User.findOne({where: {uuid: decoded['uuid']}});

        if (!user) res.status(404).send("No user found.");

        req['user'] = user;
        next();
    })
};


