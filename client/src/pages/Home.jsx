import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingCard from "../components/ListingCard";
import { LuMousePointerClick } from "react-icons/lu";
import { GiModernCity } from "react-icons/gi";

export const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto mt-[90px]">
        <div className="flex flex-col gap-6 max-w-4xl mx-auto relative">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-100 relative z-10">
            Find Your <span className="text-blue-300">Dream</span> Property
            <br />
            with Unmatched Ease
          </h1>
          <p className="text-lg md:text-xl text-blue-50 relative z-10">
            Discover a diverse selection of properties tailored to your needs
            and lifestyle. Our user-friendly platform makes finding your next
            home a breeze.
          </p>
          <Link
            to={"/search"}
            className="flex items-center mt-4 px-6 py-3 text-lg font-semibold bg-blue-300 text-blue-800 rounded-lg shadow-lg hover:bg-blue-800 hover:text-white transition relative z-10"
          >
            Get Started...
            <LuMousePointerClick size={24} className="ml-2" />
          </Link>
        </div>
      </div>

      {/* swiper */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing results for offer, sale and rent */}

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-blue-50">
                Recent offers
              </h2>
              <div className="flex justify-end border-b border-gray-700">
                <Link
                  className=" text-sm text-blue-400 hover:underline mb-2"
                  to={"/search?offer=true"}
                >
                  Show more offers
                </Link>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-blue-50">
                Recent places for rent
              </h2>
              <div className="flex justify-end border-b border-gray-700">
                <Link
                  className=" text-sm text-blue-400 hover:underline mb-2"
                  to={"/search?type=rent"}
                >
                  Show more places for rent
                </Link>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-blue-50">
                Recent places for sale
              </h2>
              <div className="flex justify-end border-b border-gray-700">
                <Link
                  className=" text-sm text-blue-400 hover:underline mb-2"
                  to={"/search?type=sale"}
                >
                  Show more places for sale
                </Link>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;
