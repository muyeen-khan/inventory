import express from "express";

import {
  CreateCategory,
  DeleteCategory,
  ReadCategory,
  UpdateCategory,
} from "../app/controllers/CategoryController.js";
import {
  CreateItem,
  DeleteItem,
  ReadItem,
  ReadItemByCategory,
  UpdateItem,
} from "../app/controllers/ItemController.js";
import {
  AllUsersReadProfiles,
  DeleteUser,
  ReadProfile,
  UpdatePassword,
  UpdateProfile,
  UserLogin,
  UserLogout,
  UserRegister,
  VerifyUserRegister,
} from "../app/controllers/UserController.js";
import authMiddleware from "../app/middlwares/authMiddleware.js";
const router = express.Router();

//User Routes
router.post("/UserRegisterOtp", UserRegister);
router.post("/VerifyUserRegister", VerifyUserRegister);
router.get("/UserLogin/:email/:pass", UserLogin);

router.get("/ReadProfile", authMiddleware, ReadProfile);
router.get("/AllUsersReadProfiles", authMiddleware, AllUsersReadProfiles);
router.post("/UpdateProfile", authMiddleware, UpdateProfile);
router.post("/UpdatePassword", authMiddleware, UpdatePassword);
router.get("/UserLogout", authMiddleware, UserLogout);
router.delete("/DeleteUser", authMiddleware, DeleteUser);

//Category Routes
router.post("/CreateCategory", authMiddleware, CreateCategory);
router.post("/UpdateCategory", authMiddleware, UpdateCategory);
router.delete("/DeleteCategory", authMiddleware, DeleteCategory);
router.get("/ReadCategory", authMiddleware, ReadCategory);

//item Routes
router.post("/CreateItem", authMiddleware, CreateItem);
router.get("/ReadItem/:name", authMiddleware, ReadItem);
router.post("/UpdateItem/:id", authMiddleware, UpdateItem);
router.delete("/DeleteItem/:id", authMiddleware, DeleteItem);

//filter by category
router.get(
  "/ReadItemByCategory/:categoryId",
  authMiddleware,
  ReadItemByCategory
);
export default router;
