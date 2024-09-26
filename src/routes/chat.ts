import express from "express";
import multer from 'multer';
import { importChat } from "../controllers/chat";

const upload = multer({dest: 'uploads/'})
const router = express.Router();

router.post('/chat',upload.single('file'),importChat);

export default router