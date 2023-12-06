import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import ListingCard from "../components/ListingCard";

const SearchListing = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [searchedData, setSearchedData] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "createdAt",
    order: "desc",
  });

  const showMoreClick = async () => {
    const length = searchedData.length;
    const start = length;

    const urlParams = new URLSearchParams(location.search);
    urlParams.set("start", start);
    const query = urlParams.toString();
    const data = await auth.searchAllListings(query);
    if (data.length < 6) {
      setShowMore(false);
    }
    setSearchedData([...searchedData, ...data]);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    // console.log(searchTermFromUrl);
    const type = urlParams.get("type");
    const parking = urlParams.get("parking");
    const furnished = urlParams.get("furnished");
    const offer = urlParams.get("offer");
    const sort = urlParams.get("sort");
    const order = urlParams.get("order");
    if (
      searchTermFromUrl ||
      type ||
      parking ||
      furnished ||
      offer ||
      sort ||
      order
    ) {
      setSidebarData({
        searchTerm: searchTermFromUrl || "",
        type: type || "all",
        parking: parking === "true" ? true : false,
        furnished: furnished === "true" ? true : false,
        offer: offer === "true" ? true : false,
        sort: sort || "createdAt",
        order: order || "desc",
      });
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonClicked(true);
    try {
      toast.loading("searching for your data", { id: "search" });
      //   im creating a new url search params caus ei wan tit to discard the old one and create a new one here for me
      // on thus page
      const urlParams = new URLSearchParams();
      urlParams.set("searchTerm", sidebarData.searchTerm);
      urlParams.set("type", sidebarData.type);
      urlParams.set("parking", sidebarData.parking);
      urlParams.set("furnished", sidebarData.furnished);
      urlParams.set("offer", sidebarData.offer);
      urlParams.set("sort", sidebarData.sort);
      urlParams.set("order", sidebarData.order);
      const searchQuery = urlParams.toString();
      console.log(searchQuery);
      navigate(`/search?${searchQuery}`);
      setLoading(true);
      const data = await auth.searchAllListings(searchQuery);
      if (data.length < 1) {
        setLoading(false);
        toast.success("no data found with this search term", { id: "search" });
      }
      if (data.length > 5) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setLoading(false);
      setSearchedData(data);
      toast.success(`${data.length} search found`, { id: "search" });
    } catch (e) {
      setLoading(false);
      toast.error(e, { id: "search" });
    }
  };

  const handlechange = (e) => {
    if (
      e.target.name === "rent" ||
      e.target.name === "sale" ||
      e.target.name === "all"
    ) {
      setSidebarData({ ...sidebarData, type: e.target.name });
    }
    if (e.target.name === "search") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (
      e.target.name === "parking" ||
      e.target.name === "furnished" ||
      e.target.name === "offer"
    ) {
      setSidebarData({ ...sidebarData, [e.target.name]: e.target.checked });
    }
    if (e.target.name === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSidebarData({
        ...sidebarData,
        sort: sort,
        order: order,
      });
    }
  };
  return (
    <div className="p-6 flex flex-col sm:flex-row gap-4 items-start">
      <div className="border-b-2 md:border-r-2 md:min-h-screen px-2 ">
        <form onSubmit={handleSubmit}>
          <div>
            <div className="flex py-3 items-center gap-3">
              <p className="text-sm font-semibold">Search Term:</p>
              <input
                className="p-2 rounded-lg outline-none"
                placeholder="Search..."
                name="search"
                type="text"
                onChange={handlechange}
                value={sidebarData.searchTerm}
              />
            </div>
            <div className="flex gap-2 items-center flex-wrap pt-4">
              <p className="text-sm font-semibold">Type:</p>
              <div className="flex gap-2">
                <input
                  className="w-4"
                  type="checkbox"
                  name="all"
                  checked={sidebarData.type === "all"}
                  onChange={handlechange}
                />
                <span className="text-sm">Rent & Sale</span>
              </div>
              <div className="flex gap-2">
                <input
                  className="w-4"
                  type="checkbox"
                  name="rent"
                  checked={sidebarData.type === "rent"}
                  onChange={handlechange}
                />
                <span className="text-sm">Rent</span>
              </div>
              <div className="flex gap-2">
                <input
                  className="w-4"
                  type="checkbox"
                  name="sale"
                  onChange={handlechange}
                  checked={sidebarData.type === "sale"}
                />
                <span className="text-sm">Sale</span>
              </div>
              <div className="flex gap-2">
                <input
                  className="w-4"
                  type="checkbox"
                  name="offer"
                  onChange={handlechange}
                  checked={sidebarData.offer}
                />
                <span className="text-sm">Offer</span>
              </div>
            </div>
            <div className="flex gap-2 items-center flex-wrap pt-4">
              <p className="text-sm font-semibold">Amenities:</p>
              <div className="flex gap-2">
                <input
                  className="w-4"
                  type="checkbox"
                  name="parking"
                  onChange={handlechange}
                  checked={sidebarData.parking}
                />
                <span className="text-sm">Parking</span>
              </div>
              <div className="flex gap-2">
                <input
                  className="w-4"
                  type="checkbox"
                  name="furnished"
                  onChange={handlechange}
                  checked={sidebarData.furnished}
                />
                <span className="text-sm">Furnished</span>
              </div>
            </div>
            <div className="flex gap-3 pt-4 items-center text-sm">
              <p className="text-sm font-semibold">Sort:</p>
              <select
                className="p-2 outline-none rounded-lg"
                name="sort_order"
                id=""
                onChange={handlechange}
                defaultValue={"createdAt_desc"}
              >
                <option value="regularPrice_desc">Price High To Low</option>
                <option value="regularPrice_asc">Price Low To High</option>
                <option value="createdAt_desc">Latest</option>
                <option value="createdAt_asc">Oldest</option>
              </select>
            </div>
            <button className="bg-slate-700 text-white w-full my-7 py-2 rounded-lg uppercase text-l">
              search
            </button>
          </div>
        </form>
      </div>
      <div className="flex-1 py-3">
        <h1 className="text-2xl font-bold border-b  text-slate-700">
          listing result:
        </h1>
        <div className="flex flex-wrap md:justify-center lg:justify-normal">
          {loading && <h1 className="text-center text-xl">Loading....</h1>}
          {searchedData < 1 && buttonClicked && (
            <h1 className="text-center text-xl">No Listing Found</h1>
          )}
          {searchedData &&
            !loading &&
            searchedData?.map((listing) => {
              return <ListingCard listing={listing} />;
            })}
          {showMore && (
            <button
              onClick={showMoreClick}
              className="text-green-700 text-center text-md w-full mr-12 py-3 font-semibold hover:underline"
            >
              SHOW MORE
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchListing;
