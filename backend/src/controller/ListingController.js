const { PrismaClient } = require("@prisma/client");
const errorHandler = require("../Utility/customErrorHandler");
const prisma = new PrismaClient();

const deleteListing = async (req, res, next) => {
  const userId = res.locals.jwtData.id;
  const { id } = req.params;

  if (!userId) {
    return next(errorHandler(404, "cant find user with listings"));
  }

  const findListing = await prisma.listing.findUnique({
    where: { id: id },
  });

  if (!findListing) {
    return next(errorHandler(404, "cant find this particular listings"));
  }

  if (findListing.userId !== userId) {
    return next(errorHandler(403, "Unauthorized to access this listing"));
  }

  try {
    const deletedListing = await prisma.listing.delete({
      where: { id: id },
    });

    res
      .status(200)
      .json({ mmessage: `deleted user with id ${deletedListing.id}` });
  } catch (e) {
    next(e);
  }
};

const getListing = async (req, res, next) => {
  const { id } = req.params;

  try {
    const findListing = await prisma.listing.findUnique({
      where: { id: id },
    });

    if (!findListing) {
      return next(errorHandler(404, "cant find this particular listings"));
    }

    res.status(200).json({ message: "Listing Found", listing: findListing });
  } catch (e) {
    return next(e);
  }
};

const editListing = async (req, res, next) => {
  const { id } = req.params;
  const decoded_id = res.locals.jwtData.id;

  const {
    name,
    description,
    address,
    regularPrice,
    discountPrice,
    bathrooms,
    bedrooms,
    furnished,
    parking,
    type,
    offer,
    images,
  } = req.body;

  try {
    const foundListing = await prisma.listing.findUnique({ where: { id: id } });
    if (!foundListing) {
      return next(errorHandler(404, "no listing found"));
    }
    if (foundListing.userId !== decoded_id) {
      return next(errorHandler(400, "cant edit anothers listing"));
    }
    try {
      const updatedListing = await prisma.listing.update({
        where: { id: id },
        data: {
          name: name || updatedListing.name,
          description: description || updatedListing.description,
          address: address || description.address,
          regularPrice: regularPrice || updatedListing.regularPrice,
          discountPrice: discountPrice || updatedListing.discountPrice,
          bathrooms: bathrooms || updatedListing.bathrooms,
          bedrooms: bedrooms || updatedListing.bedrooms,
          furnished: furnished || updatedListing.furnished,
          parking: parking || updatedListing.parking,
          type: type || updatedListing.type,
          offer: offer || updatedListing.offer,
          images: images || updatedListing.images,
        },
      });

      res
        .status(200)
        .json({ message: "listing updated", listing: updatedListing });
    } catch (e) {
      next(e);
    }
  } catch (e) {
    next(e);
  }
};

const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const start = parseInt(req.query.start) || 0;
    console.log("limit ====================" + limit);
    console.log("start ====================" + start);
    let offer = req.query.offer;

    const whereClause = {
      AND: [],
      OR: [],
    };
    if (offer === undefined || offer === "false" || offer === false) {
      whereClause.OR.push({ offer: true }, { offer: false });
    } else {
      whereClause.AND.push({ offer: true });
    }

    let furnished = req.query.furnished;
    if (
      furnished === undefined ||
      furnished === "false" ||
      furnished === false
    ) {
      whereClause.OR.push({ furnished: true }, { furnished: false });
    } else {
      whereClause.AND.push({ furnished: true });
    }

    let parking = req.query.parking;
    if (parking === undefined || parking === "false" || parking === false) {
      whereClause.OR.push({ parking: true }, { parking: false });
    } else {
      whereClause.AND.push({ parking: true });
    }

    let type = req.query.type;
    if (type === undefined || type === "all") {
      whereClause.OR.push({ type: "rent" }, { type: "sale" });
    } else if (type === "sale") {
      whereClause.AND.push({ type: "sale" });
    } else {
      whereClause.AND.push({ type: "rent" });
    }

    const searchTerm = req.query.searchTerm || "";

    if (searchTerm.length > 0) {
      whereClause.AND.push({
        name: {
          contains: searchTerm,
          mode: "insensitive",
        },
      });
    }

    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";
    console.log(whereClause);

    const results = await prisma.listing.findMany({
      take: limit,
      skip: start,
      where: whereClause,
      orderBy: {
        [sort]: order,
      },
    });
    console.log(
      `offer=${offer}, furnished=${furnished} parking=${parking} ,type=${type}`
    );

    return res
      .status(200)
      .json({ message: "listings found", listings: results });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteListing, getListing, editListing, getListings };
