import express from "express";
import {
  deleteUser,
  getUsers,
  readUser,
  updateUser,
} from "../Controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res) => {
//   res.send("User is authenticated");
// });
// router.get("/checkuser/:id", verifyUser, (req, res) => {
//   res.send("hello you are authenticated and you can delete your account");
// });
// router.get("/checkadmin/:id", verifyAdmin, (req, res) => {
//   res.send("hello Admin you are authenticated and you can delete all accounts");
// });

//update
router.put("/:id", verifyUser, updateUser);

//read
router.get("/:id", readUser);
//delete
router.delete("/:id", verifyUser, deleteUser);

//get
router.get("/", getUsers);
export default router;
