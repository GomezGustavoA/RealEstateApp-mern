import express from "express";

import { verifyToken } from "../utils/verifyUser.js";
import {
  postSendMail,
  postSendContactMail,
} from "../controllers/sendMail.controller.js";

const router = express.Router();

router.post("/send", verifyToken, postSendMail);
router.post("/contact", postSendContactMail);

export default router;
