import express from "express";
import {
  countbycity,
  countByType,
  createHotel,
  deleteHotel,
  getHotelRooms,
  getHotels,
  readHotel,
  updateHotel,
} from "../Controllers/hotel.js";
import Hotel from "../models/Hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();
//create
router.post("/", verifyAdmin, createHotel);
//update
router.put("/:id", verifyAdmin, updateHotel);

//read
router.get("/find/:id", readHotel);
//delete
router.delete("/:id", verifyAdmin, deleteHotel);
//get
router.get("/find", getHotels);
router.get("/", getHotels);

router.get("/countbycity", countbycity);
router.get("/countbytype", countByType);
router.get("/rooms/:id", getHotelRooms);

export default router;
