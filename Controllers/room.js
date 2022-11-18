import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

export const createRoom = async (req, res, next) => {
  const newRoom = new Room(req.body);
  const hotelId = req.params.hotelId;

  try {
    const saveRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, { $push: { room: saveRoom._id } });
    } catch (error) {
      next(error);
    }
    res.status(200).json(saveRoom);
  } catch (error) {
    next(error);
  }
};

export const updateRoomAvailablity = async (req, res) => {
  try {
    await Room.updateOne(
      { "roomNumber._id": req.params.id },
      { $push: { "roomNumber.$.unavailableDates": req.body.dates } }
    );
    console.log(req.body.dates);

    res.status(200).json("Room date has been added");
  } catch (error) {
    res.status(500).json({ error });
    console.log({ error });
  }
};
export const updateRoom = async (req, res) => {
  try {
    const updateRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateRoom);
  } catch (error) {
    res.status(500).json({ error });
    console.log({ error });
  }
};

export const readRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ error });
    console.log({ error });
  }
};

export const deleteRoom = async (req, res, next) => {
  try {
    const updateRoom = await Room.findByIdAndDelete(req.params.id);
    const hotelId = req.params.hotelId;
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { room: req.params.id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json("Room Deleted");
  } catch (error) {
    res.status(500).json({ error });
    console.log({ error });
  }
};

export const getRooms = async (req, res) => {
  try {
    const Rooms = await Room.find();
    res.status(200).json(Rooms);
  } catch (error) {
    res.status(500).json({ error });
    console.log({ error });
  }
};
