import express from 'express';
import {
    createCar, getUserCars, searchCars, getCarById,
    updateCar, deleteCar
} from '../controllers/carController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authenticateToken, createCar);
router.get('/', authenticateToken, getUserCars);
router.get('/search', authenticateToken, searchCars);
router.get('/:id', authenticateToken, getCarById);
router.put('/:id', authenticateToken, updateCar);
router.delete('/:id', authenticateToken, deleteCar);

export default router;
