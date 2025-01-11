import express from "express";

import {
  AllUsersReadProfiles,
  DeleteUser,
  ReadProfile,
  UpdateProfile,
  UserLogin,
  UserLogout,
  UserRegister,
} from "../app/controllers/UserController.js";
import authMiddleware from "../app/middlwares/authMiddleware.js";
const router = express.Router();

//User Routes
router.post("/UserRegister", UserRegister);
router.get("/UserLogin/:email/:pass", UserLogin);

router.post("/UpdateProfile", authMiddleware, UpdateProfile);
router.get("/UserLogout", authMiddleware, UserLogout);

router.get("/ReadProfile", authMiddleware, ReadProfile);
router.get("/AllUsersReadProfiles", authMiddleware, AllUsersReadProfiles);

router.delete("/DeleteUser", authMiddleware, DeleteUser);

export default router;
