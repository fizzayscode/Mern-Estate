import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import swiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const ParticularListing = () => {
  const [listing, setListing] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const auth = useAuth();

  useEffect(() => {
    const fetchUserListing = async (params) => {
      try {
        setLoading(true);
        const data = await auth?.getListing(params);
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
    console.log(listing.images);
  }, [params.id]);
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
          <p>hello world</p>
        </Swiper>
      )}
    </main>
  );
};

export default ParticularListing;
