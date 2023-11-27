import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const ListingBox = ({ images, name, id, INDEX, handleDelete }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  console.log(name);
  return (
    <main className="border-2 p-3">
      <div className="flex items-center justify-between gap-5">
        <Link to={`../../listing/${id}`}>
          <img className="h-20 w-30" src={images ? images[0] : ""} />
        </Link>
        <div className="flex-1">
          <Link to={`../../listing/${id}`}>
            <p>{name}</p>
          </Link>
        </div>
        <div className="flex flex-col">
          <Link
            to={`/profile/listing/edit/${id}`}
            className="text-green-700 uppercase text-sm"
          >
            edit
          </Link>
          <Link
            onClick={() => {
              auth.deleteUserListing(id);
              handleDelete(id);
            }}
            className="text-red-700 uppercase text-sm"
          >
            delete
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ListingBox;
