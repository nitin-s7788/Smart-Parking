import express from "express";
const router = express.Router();

// import { signin, signup } from "../controllers/user.js";
import { getSlots, getSlot, createSlot, updateSlot, deleteSlot } from "../controllers/slots.js";

// router.post("/signin", signin);
// router.post("/signup", signup);

router.get('/', getSlots);
router.get('/:id', getSlot);
router.post('/', createSlot);    
router.put('/:id', updateSlot);      // this is not working properly
router.delete('/:id', deleteSlot);

export default router;