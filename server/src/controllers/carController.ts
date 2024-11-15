import type { Request, Response } from 'express';
import prisma from '../prismaClient.ts';
import { CREATED, NO_CONTENT, NOT_FOUND, OK } from '../utils/constants';

export const createCar = async (req: Request, res: Response) => {
    const { title, description, carType, company, dealer, images, tags } = req.body;

    const car = await prisma.car.create({
        data: {
            title, description, carType, company, dealer, images, tags,
            userId: req.user.id,
        }
    });

    res.status(CREATED).json(car);
};

export const getUserCars = async (req: Request, res: Response) => {
    const cars = await prisma.car.findMany({
        where: { userId: req.user.id }
    });
    res.status(OK).json(cars);
};

export const searchCars = async (req: Request, res: Response) => {
    const { keyword } = req.query;

    const cars = await prisma.car.findMany({
        where: {
            userId: req.user.id,
            OR: [
                { title: { contains: keyword, mode: 'insensitive' } },
                { description: { contains: keyword, mode: 'insensitive' } },
                { tags: { hasSome: keyword } }
            ]
        }
    });

    res.status(OK).json(cars);
};

export const getCarById = async (req: Request, res: Response) => {
    const car = await prisma.car.findUnique({
        where: { id: Number(req.params.id), userId: req.user.id }
    });

    car ? res.status(OK).json(car) : res.status(NOT_FOUND).send('Car not found');
};

export const updateCar = async (req: Request, res: Response) => {
    const { title, description, carType, company, dealer, images, tags } = req.body;

    const car = await prisma.car.update({
        where: { id: Number(req.params.id), userId: req.user.id },
        data: { title, description, carType, company, dealer, images, tags }
    });

    res.status(OK).json(car);
};

export const deleteCar = async (req: Request, res: Response) => {
    await prisma.car.delete({
        where: { id: Number(req.params.id), userId: req.user.id }
    });
    res.sendStatus(NO_CONTENT);
};
