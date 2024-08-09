import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  try {
    if (req.user.id !== req.body.userRef) {
      return next(errorHandler(401, "You can only delete your own listings"));
    }

    const deleteListing = await Listing.findByIdAndDelete({
      _id: req.body.id,
      userRef: req.body.userRef,
    });
    if (!deleteListing) return next(errorHandler(404, "Listing not found!"));

    res.status(200).json("Listing deleted successfully");
  } catch (error) {
    next(error);
  }
};
