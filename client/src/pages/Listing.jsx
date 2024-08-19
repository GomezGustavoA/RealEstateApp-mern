import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaUserPlus,
} from "react-icons/fa";
FaUserPlus;
import { useSelector } from "react-redux";
import Contact from "../components/Contact";

const Listing = () => {
  SwiperCore.use([Navigation]);
  const currentUser = useSelector((state) => state.user.currentUser);
  const params = useParams();
  const [listing, setListing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorGetListing, setErrorGetListing] = useState(false);
  const [contact, setContact] = useState(false);
  useEffect(() => {
    const fetchListingById = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.id}`);
        const data = await res.json();
        if (data.success === false) {
          setErrorGetListing(data.message);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
      } catch (error) {
        setErrorGetListing(error.message);
        setLoading(false);
      }
    };
    fetchListingById();
  }, [params.id]);
  return (
    <main className="min-w-[350px] p-4">
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {errorGetListing && (
        <div className=" bg-blue-800 text-blue-100 p-8 rounded-lg shadow-lg max-w-lg mx-auto mt-24">
          <h2 className="text-3xl font-bold mb-4">
            To Access Full Property Details
          </h2>
          <p className="text-xl mb-6">
            Please <span className="font-semibold">register</span> to view the
            complete information about this property. Registration is quick and
            easy!
          </p>
          <Link
            to="/sign-up"
            className="flex items-center justify-center px-8 py-4 text-xl font-semibold bg-blue-300 text-blue-800 rounded-lg shadow-md hover:bg-blue-400 hover:text-white transition-colors"
          >
            <FaUserPlus size={24} className="mr-3" />
            Register Now
          </Link>
        </div>
      )}
      {listing && !loading && !errorGetListing && (
        <div className="max-w-7xl mx-auto bg-blue-100 shadow-lg overflow-hidden rounded ">
          <div className="relative">
            <Swiper navigation>
              {listing.imageUrls.map((url, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="h-[550px]"
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-30 backdrop-blur-sm p-4 z-10">
              <h1 className="text-2xl font-bold text-white">{listing.name}</h1>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center mb-4">
              {listing.offer && (
                <p className="text-lg line-through text-red-500 mr-2">
                  ${listing.price}
                </p>
              )}
              <p className="text-3xl font-bold text-green-600">
                $
                {listing.offer
                  ? listing.price - listing.discountPrice
                  : listing.price}
                {listing.type === "rent" && " / month"}
              </p>
            </div>
            <p className="flex items-center text-slate-600 my-2 text-sm font-semibold">
              <FaMapMarkerAlt className="text-green-700 mr-1" />
              {listing.address}
            </p>
            <div className="flex gap-4 mb-4">
              <p className="bg-red-600 text-white text-center px-4 py-2 rounded-md shadow-sm">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-green-600 text-white text-center px-4 py-2 rounded-md shadow-sm">
                  ${listing.discountPrice} OFF
                </p>
              )}
            </div>
            <p className="hidden sm:block md:text-gray-800 mb-4">
              <span className="font-semibold text-black">Description:</span>{" "}
              {listing.description}
            </p>
            <ul className="text-green-700 font-semibold text-sm flex items-center gap-4 flex-wrap">
              <li className="flex items-center gap-1">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds`
                  : `${listing.bedrooms} bed`}
              </li>
              <li className="flex items-center gap-1">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths`
                  : `${listing.bathrooms} bath`}
              </li>
              <li className="flex items-center gap-1">
                <FaParking className="text-lg" />
                {listing.parking ? `Parking Spot` : `No Parking`}
              </li>
              <li className="flex items-center gap-1">
                <FaChair className="text-lg" />
                {listing.furnished ? `Furnished` : `Not Furnished`}
              </li>
            </ul>
            {currentUser && listing.userRef !== currentUser._id && (
              <div className="mt-9">
                {!contact ? (
                  <button
                    onClick={() => setContact(true)}
                    className="bg-blue-600 text-white rounded-lg uppercase hover:opacity-95 p-3"
                  >
                    Talk to the Landlord
                  </button>
                ) : (
                  <Contact listing={listing} />
                )}{" "}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default Listing;
