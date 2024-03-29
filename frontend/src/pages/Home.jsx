import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Swiper, SwiperSlide } from "swiper/react";
import ListingCard from "../components/ListingCard";

const Home = () => {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [recentData, setRecentData] = useState([]);
  const [offerData, setOfferData] = useState([]);
  const [rentData, setRentData] = useState([]);
  const [saleData, setSaleData] = useState([]);

  useEffect(() => {
    const fetchRecentData = async () => {
      const realQuery = "limit=4";
      try {
        const data = await auth.searchAllListings(realQuery);
        setRecentData(data);
        fetchOfferData();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecentData();

    const fetchOfferData = async () => {
      const realQuery = "offer=true&limit=4";
      try {
        const data = await auth.searchAllListings(realQuery);
        setOfferData(data);
        fetchRentData();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentData = async () => {
      const realQuery = "type=rent&limit=4";
      try {
        const data = await auth.searchAllListings(realQuery);
        setRentData(data);
        fetchSaleData();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSaleData = async () => {
      const realQuery = "type=sale&limit=4";
      try {
        const data = await auth.searchAllListings(realQuery);
        setSaleData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
  }, []);
  return (
    <main>
      <div className="max-w-5xl mx-auto py-[80px] px-3 flex flex-col gap-6 items-start">
        <h1 className="text-3xl lg:text-5xl font-bold text-slate-800">
          Find your next <span className="text-slate-500">perfect</span> <br />{" "}
          place with ease
        </h1>
        <p className="text-gray-400 text-xs md:text-sm">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          <br />
          industry. Lorem Ipsum has been the industry's standard
          <br /> dummy text ever since the 1500s, when an unknown
          <br /> printer took a galley of type and scrambled it to make a
        </p>
        <Link
          to={"/search"}
          className="bg-transparent text-blue-800 font-semibold text-xs sm:text-sm hover:underline"
        >
          Let's start Now...
        </Link>
      </div>
      {offerData && (
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          slidesPerView={1}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {recentData?.map((data) => {
            return (
              <SwiperSlide key={data.id}>
                <div
                  className="h-[500px]"
                  style={{
                    backgroundImage: `url(${data.images[0]})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerData && offerData.length > 0 && (
          <div>
            <div className="px-3">
              <h1 className="text-2xl text-slate-600 font-bold capitalize">
                recent offers
              </h1>
              <Link
                className=" text-blue-600 text-sm"
                to={"/search?offer=true"}
              >
                show more offers
              </Link>
            </div>
            <div className="flex flex-wrap  gap-4">
              {offerData.map((listing) => {
                return <ListingCard listing={listing} />;
              })}
            </div>
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {rentData && rentData.length > 0 && (
          <div>
            <div className="px-3">
              <h1 className="text-2xl text-slate-600 font-bold capitalize">
                recent places for rent
              </h1>
              <Link className=" text-blue-600 text-sm" to={"/search?type=rent"}>
                show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap  gap-4">
              {rentData.map((listing) => {
                return <ListingCard listing={listing} />;
              })}
            </div>
          </div>
        )}
      </div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {saleData && saleData.length > 0 && (
          <div>
            <div className="px-3">
              <h1 className="text-2xl text-slate-600 font-bold capitalize">
                recent places for sale
              </h1>
              <Link className=" text-blue-600 text-sm" to={"/search?type=sale"}>
                show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap  gap-4">
              {saleData.map((listing) => {
                return <ListingCard listing={listing} />;
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
