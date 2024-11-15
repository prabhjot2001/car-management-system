import bcrypt from 'argon2';
import jwt from 'jsonwebtoken';
import type { Request, Response } from 'express';
import prisma from '../prismaClient.ts';
import { CREATED, BAD_REQUEST, UNAUTHORIZED } from '../utils/constants';

export const signup = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password);

    const user = await prisma.user.create({
        data: { email, password: hashedPassword }
    });

    res.status(CREATED).json(user);
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (user && await bcrypt.verify(user.password, password)) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);
        res.json({ token });
    } else {
        res.status(UNAUTHORIZED).send('Invalid credentials');
    }
};
