import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [listing, setListing] = useState([]);
  console.log(listing);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const FurnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");
    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      FurnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebarData({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: FurnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fecthListings = async () => {
      try {
        setLoading(true);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        console.log(searchQuery);
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          setLoading(false);
          return;
        }
        setListing(data);
        setError(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fecthListings();
  }, [location.search]);
  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebarData({ ...sidebarData, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebarData({
        ...sidebarData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";

      const order = e.target.value.split("_")[1] || "desc";

      setSidebarData({ ...sidebarData, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("type", sidebarData.type);
    urlParams.set("parking", sidebarData.parking);
    urlParams.set("furnished", sidebarData.furnished);
    urlParams.set("offer", sidebarData.offer);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("order", sidebarData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-50">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen bg-white shadow-lg">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="searchTerm"
              className="text-sm font-semibold text-gray-700"
            >
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Enter keywords..."
              value={sidebarData.searchTerm}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-slate-400 outline-none transition"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label className="text-sm font-semibold text-gray-700">Type:</label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="all"
                  className="w-5 h-5"
                  onChange={handleChange}
                  checked={sidebarData.type === "all"}
                />
                <span>Rent & Sale</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-5 h-5"
                  onChange={handleChange}
                  checked={sidebarData.type === "rent"}
                />
                <span>Rent</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="sale"
                  className="w-5 h-5"
                  onChange={handleChange}
                  checked={sidebarData.type === "sale"}
                />
                <span>Sale</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5 h-5"
                  onChange={handleChange}
                  checked={sidebarData.offer}
                />
                <span>Offer</span>
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <label className="text-sm font-semibold text-gray-700">
              Amenities:
            </label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="parking"
                  className="w-5 h-5"
                  onChange={handleChange}
                  checked={sidebarData.parking}
                />
                <span>Parking</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="furnished"
                  className="w-5 h-5"
                  onChange={handleChange}
                  checked={sidebarData.furnished}
                />
                <span>Furnished</span>
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="sort_order"
              className="text-sm font-semibold text-gray-700"
            >
              Sort:
            </label>
            <select
              id="sort_order"
              className="border rounded-lg p-3 focus:ring-2 focus:ring-slate-400 outline-none transition"
              onChange={handleChange}
              defaultValue={"created_at_desc"}
            >
              <option value="price_desc">Price: High to Low</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="createAt_desc">Latest</option>
              <option value="createAt_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 transition">
            Search
          </button>
        </form>
      </div>

      <div className="p-7 flex-1">
        <h1 className="text-2xl font-bold text-gray-700 mb-6">
          Listing Results:
        </h1>
      </div>
    </div>
  );
};

export default Search;
