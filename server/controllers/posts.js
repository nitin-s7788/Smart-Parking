import express from 'express';
import mongoose from 'mongoose';

import CarsInfo from '../models/CarsInfo.js';

const router = express.Router();

export const getCars = async (req, res) => { 
    try {
        const Cars = await CarsInfo.find();
                
        res.status(200).json(Cars);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getCar = async (req, res) => { 
    const { id } = req.params;

    try {
        const Car = await CarsInfo.findById(id);
        
        res.status(200).json(Car);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createCar = async (req, res) => {

    // if (!req.userId) {                                          // removing this compromise security
    //     return res.json({ message: "Unauthenticated" });
    //   }

    const Car = req.body;

    const newCar = new CarsInfo({ ...Car, createdAt: new Date().toISOString() })

    try {
        await newCar.save();

        res.status(201).json(newCar );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateCar = async (req, res) => {

    
    // if (!req.userId) {
    //     return res.json({ message: "Unauthenticated" });
    //   }

    const { id } = req.params;
    const { numberPlate, info } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Car with id: ${id}`);

    const oldCar = await CarsInfo.findById(id);

    // const updatedPost = { ...oldPost, creator : creator, title : title, message : message, tags : tags, selectedFile : selectedFile };  this does not work correctly

    const updatedCar = { _id : oldCar._id, createdAt : oldCar.createdAt, numberPlate : numberPlate, info : info };

    // console.log(updatedPost);

    await CarsInfo.findByIdAndUpdate(id, updatedCar, { new: true });

    // console.log("hello");

    res.json(updatedCar);
}

export const deleteCar = async (req, res) => {
    const { id } = req.params;

    // if (!req.userId) {
    //     return res.json({ message: "Unauthenticated" });
    //   }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Car with id: ${id}`);

    await CarsInfo.findByIdAndRemove(id);

    res.json({ message: "Car deleted successfully." });
}


export default router;