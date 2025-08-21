// chats.routes.js
import express from "express";
import {
  getAllChats,
  getChatById,
  createChat,
  updateChat,
  deleteChat
} from "../controllers/chats.controllers.js"

import { VerifyJWT } from "../middlewares/auth.middleware.js"; // your VerifyJWT middleware

const router = express.Router();

router.use(VerifyJWT);

router.get("/", getAllChats);
router.get("/:chatId", getChatById);
router.post("/new", createChat);  
router.post("/", createChat);    
router.post("/:chatId", updateChat);
router.delete("/:chatId", deleteChat);

export default router;
