const express = require("express");
const {
  deleteListing,
  getListing,
  editListing,
  getListings,
} = require("../controller/ListingController");
const { verifyToken } = require("../Middleware/verifyToken");

const listingRouter = express.Router();

listingRouter.route("/delete-listing/:id").delete(verifyToken, deleteListing);
listingRouter.route("/getListing/:id").get(getListing);
listingRouter.route("/updateListing/:id").patch(verifyToken, editListing);
listingRouter.route("/get").get(getListings);

module.exports = listingRouter;
