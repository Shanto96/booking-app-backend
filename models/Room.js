import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
    desc: {
      type: String,
      required: true,
    },
    photos: {
      type: [String],
    },

    price: {
      type: Number,
      required: true,
    },
    maxPerson: {
      type: Number,
    },

    title: {
      type: String,
      required: true,
    },
    roomNumber: [{ number: Number, unavailableDates: [{ type: Date }] }],
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);
