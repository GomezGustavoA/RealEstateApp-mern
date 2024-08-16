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

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(errorHandler(404, "Listing not found!"));
  if (req.user.id !== listing.userRef)
    return next(errorHandler(401, "You can only update your own Listings!"));

  try {
    const updateListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updateListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    // Convertir a booleanos si son "true" o "false"

    const offer = req.query.offer === "true" ? true : { $in: [false, true] };
    const furnished =
      req.query.furnished === "true" ? true : { $in: [false, true] };
    const parking =
      req.query.parking === "true" ? true : { $in: [false, true] };
    const type =
      req.query.type && req.query.type !== "all"
        ? req.query.type
        : { $in: ["rent", "sale"] };

    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";
    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
