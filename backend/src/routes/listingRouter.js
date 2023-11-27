const express = require("express");
const {
  deleteListing,
  getListing,
  editListing,
} = require("../controller/ListingController");
const { verifyToken } = require("../Middleware/verifyToken");

const listingRouter = express.Router();

listingRouter.route("/delete-listing/:id").delete(verifyToken, deleteListing);
listingRouter.route("/getListing/:id").get(verifyToken, getListing);
listingRouter.route("/updateListing/:id").patch(verifyToken, editListing);

module.exports = listingRouter;
