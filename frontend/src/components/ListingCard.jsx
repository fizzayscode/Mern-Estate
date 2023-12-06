import React from "react";
import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";

const ListingCard = ({ listing }) => {
  return (
    <Link to={`/listing/${listing.id}`}>
      <main className="w-60 flex flex-col min-h-[325px] shadow-lg bg-white m-3 overflow-hidden">
        <div className="flex flex-col gap-4 ">
          <div>
            <img
              className="max-w-full object-contain hover:scale-110 transition-transform duration-300 ease-in-out transform"
              src={listing.images[0]}
              alt="listing image"
            />
          </div>
          <div className="px-3 text-gray-700 text-xs flex flex-col gap-2">
            <h1 className="text-[18px] font-semibold">{listing.name}</h1>
            <p className="flex items-center gap-1 ">
              <FaLocationDot className="text-green-700" />
              <span className=" font-semibold">{listing.address}</span>
            </p>
            <p>
              {listing.description.length > 100
                ? `${listing.description.slice(0, 100)}...`
                : listing.description}
            </p>
            <div>
              <p className="text-[16px] font-semibold">
                N{" "}
                {listing.type === "rent"
                  ? `${listing.regularPrice} / Month`
                  : listing.regularPrice}
              </p>
            </div>
            <div className="flex items-center text-xs font-bold gap-5">
              <p>
                {listing.bedrooms.length > 1
                  ? `${listing.bedrooms} beds`
                  : `${listing.bedrooms} bed`}
              </p>
              <p>
                {listing.bathrooms.length > 1
                  ? `${listing.bedrooms} baths`
                  : `${listing.bedrooms} bath`}
              </p>
            </div>
          </div>
        </div>
      </main>
    </Link>
  );
};

export default ListingCard;
