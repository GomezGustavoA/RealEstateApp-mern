import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";

const ListingCard = ({ listing }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 w-full sm:w-[350px]">
      <Link to={`/listing/${listing._id}`}>
        <div className="relative">
          <img
            src={
              listing.imageUrls[0] ||
              "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg"
            }
            alt="listing cover"
            className="w-full h-[200px] sm:h-[250px] object-cover transition-transform duration-500 transform hover:scale-110"
          />
          {listing.offer && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
              Sale
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col gap-3">
          <p className="text-xl font-bold text-gray-900 truncate">
            {listing.name}
          </p>
          <div className="flex items-center gap-2 text-gray-700">
            <MdLocationOn className="h-5 w-5 text-green-700" />
            <p className="text-sm truncate">{listing.address}</p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-gray-900 text-2xl font-semibold">
              $
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US")
                : listing.price.toLocaleString("en-US")}
            </p>
            {listing.type === "rent" && (
              <p className="text-gray-600 text-sm">/ month</p>
            )}
          </div>
          <div className="text-gray-600 flex gap-4 mt-2 text-sm">
            <div className="flex items-center">
              <span className="font-medium mr-1">{listing.bedrooms}</span>
              <span>{listing.bedrooms > 1 ? "beds" : "bed"}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium mr-1">{listing.bathrooms}</span>
              <span>{listing.bathrooms > 1 ? "baths" : "bath"}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingCard;
