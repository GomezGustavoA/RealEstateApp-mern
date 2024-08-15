import express from "express";

import { verifyToken } from "../utils/verifyUser.js";
import { postSendMail } from "../controllers/sendMail.controller.js";

const router = express.Router();

router.post("/send", verifyToken, postSendMail);

export default router;
