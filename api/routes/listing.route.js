import express from "express";
import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
} from "../controllers/listing.controllers.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.delete("/delete", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);
router.get("/get/:id", verifyToken, getListing);

export default router;
