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
  const userId = res.locals.jwtData.id;
  const { id } = req.params;

  if (!userId) {
    return next(errorHandler(404, "cant find user with listings"));
  }

  try {
    const findListing = await prisma.listing.findUnique({
      where: { id: id },
    });

    if (!findListing) {
      return next(errorHandler(404, "cant find this particular listings"));
    }
    if (findListing.userId !== userId) {
      return next(errorHandler(403, "Unauthorized to access this listing"));
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

module.exports = { deleteListing, getListing, editListing };
