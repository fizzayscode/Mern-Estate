import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaLocationDot } from "react-icons/fa6";
import { FaBath } from "react-icons/fa";
import { FaParking } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { MdChair } from "react-icons/md";
import swiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const ParticularListing = () => {
  const [listing, setListing] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [userError, setUserError] = useState(false);
  const [messageBox, setMessageBox] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [messageInput, setMessageInput] = useState("");
  const params = useParams();
  const auth = useAuth();

  const getUser = async (userId) => {
    try {
      const user = await auth.getUser(userId);
      if (user) {
        setUser(user);
        setUserError(false);
      } else {
        setUser(null);
        setUserError(true);
      }
    } catch (error) {
      console.log(e);
    }
  };
  const handleMessageChange = (e) => {
    setMessageInput(e.target.value);
    console.log(messageInput);
  };

  useEffect(() => {
    const fetchUserListing = async (params) => {
      try {
        setLoading(true);
        const data = await auth?.getListing(params);
        getUser(listing.userId);
        if (!data) {
          setError(true);
          setLoading(true);
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (e) {
        console.log(e);
        setError(true);
        setLoading(false);
      }
    };
    fetchUserListing(params.id);

    console.log(user);
  }, [params.id]);
  console.log(listing);

  const handleFormSubmit = () => {
    const mailtoLink = `mailto:${user.email}?subject=regarding ${listing.name}&body=${messageInput}`;
    window.location.href = mailtoLink;
  };

  return (
    <main>
      {loading && <p>Loading.....</p>}
      {error && (
        <p className="text-center my-7 text-2xl">something went wrong!</p>
      )}
      {!error && !loading && listing && (
        <Swiper Navigation>
          {listing?.images?.map((url) => {
            return (
              <SwiperSlide key={url}>
                <div
                  className="h-[500px]"
                  style={{
                    backgroundImage: `url(${url})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            );
          })}
          <main className="max-w-3xl mx-auto py-5 px-3">
            <h1 className="text-2xl font-bold">
              {listing.name} -{" "}
              <span className="text-green-700 text-sm">NGN</span>{" "}
              <span className="text-sm">{listing.regularPrice} / month</span>
            </h1>
            <p className="flex items-center gap-1 my-4">
              <FaLocationDot className="text-green-700" />
              <span className="text-sm">{listing.address}</span>
            </p>
            <div className="flex gap-3">
              <p className="bg-red-800 text-white text-sm my-3 p-1 w-40 rounded-lg text-center">
                {listing.type === "sell" ? (
                  <span>For Sale</span>
                ) : (
                  <span>For Rent</span>
                )}
              </p>
              {listing.discountPrice && (
                <p className="bg-green-700 text-white text-sm my-3 p-1 w-40 rounded-lg text-center">
                  Discount {listing.discountPrice}% off
                </p>
              )}
            </div>
            <div>
              <p className="text-sm">
                <span className="font-bold">Description - </span>
                {listing.description}
              </p>
            </div>
            <div className="py-3 text-green-800 text-sm flex flex-wrap gap-4 ">
              <div className="flex items-center gap-1">
                <p>
                  <FaBed />
                </p>
                {listing.bedrooms > 1 ? (
                  <span className="text-xs font-semibold">
                    {listing.bedrooms} beds
                  </span>
                ) : (
                  <span className="text-xs font-semibold">
                    {listing.bedrooms}bed
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 whitespace-nowrap">
                <p>
                  <FaBath />
                </p>
                {listing.bedrooms > 1 ? (
                  <span className="text-xs font-semibold">
                    {listing.bathrooms} baths
                  </span>
                ) : (
                  <span className="text-xs font-semibold">
                    {listing.bathrooms} bath
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 whitespace-nowrap">
                <p>
                  <FaParking />
                </p>
                {listing.parking ? (
                  <span>Parking</span>
                ) : (
                  <span>No Parking</span>
                )}
              </div>
              <div className="flex items-center gap-1 whitespace-nowrap">
                <p>
                  <MdChair />
                </p>
                {listing.furnished ? (
                  <span>Furnished</span>
                ) : (
                  <span>No Furnished</span>
                )}
              </div>
            </div>
            <div>
              {listing.userId !== auth.user.id ? (
                <div>
                  <p>
                    Contact
                    <strong> {user.username}</strong> for{" "}
                    <strong>{listing.name}</strong>
                  </p>
                  {showButton && (
                    <button
                      className="w-full p-3 bg-slate-700 my-4 text-white rounded-lg"
                      onClick={() => {
                        setMessageBox(true), setShowButton(false);
                      }}
                    >
                      SEND MESSAGE
                    </button>
                  )}

                  <div>
                    {" "}
                    {messageBox && (
                      <>
                        <textarea
                          className="w-full outline-none p-2 my-4 rounded-lg"
                          placeholder="enter your message"
                          rows={2}
                          value={messageInput}
                          onChange={handleMessageChange}
                        ></textarea>
                        <Link
                          to={`mailto:${user.email}?subject=regarding ${listing.name}&body=${messageInput}`}
                          className="p-2 bg-slate-700 text-white rounded-lg text-sm w-full block text-center"
                        >
                          SEND
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </main>
        </Swiper>
      )}
    </main>
  );
};

export default ParticularListing;
