import express from 'express';

import { getCars, getCar, createCar, updateCar, deleteCar } from '../controllers/posts.js';

const router = express.Router();

// import auth from "../middleware/auth.js";

router.get('/', getCars);
router.get('/:id', getCar);
router.post('/', createCar);    
router.put('/:id', updateCar);      // this is not working properly
router.delete('/:id', deleteCar);


export default router;