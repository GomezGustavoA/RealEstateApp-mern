// const Search = () => {
//   return (
//     <div className="flex flex-col md:flex-row">
//       <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
//         <form className="flex flex-col gap-8">
//           <div className="flex items-center gap-2">
//             <label className="whitespace-nowrap">Serch Term:</label>
//             <input
//               type="text"
//               id="searchTerm"
//               placeholder="Search..."
//               className="border rounded-la p-3 w-full"
//             />
//           </div>
//           <div className="flex gap-2 flex-wrap items-center">
//             <label>Type:</label>
//             <div className="flex gap-2">
//               <input type="checkbox" id="all" className="w-5" />
//               <span>Rent & Sale</span>
//             </div>
//             <div className="flex gap-2">
//               <input type="checkbox" id="rent" className="w-5" />
//               <span>Rent</span>
//             </div>
//             <div className="flex gap-2">
//               <input type="checkbox" id="sale" className="w-5" />
//               <span>Sale</span>
//             </div>
//             <div className="flex gap-2">
//               <input type="checkbox" id="offer" className="w-5" />
//               <span>Offer</span>
//             </div>
//           </div>
//           <div className="flex gap-2 flex-wrap items-center">
//             <label>Amenities:</label>
//             <div className="flex gap-2">
//               <input type="checkbox" id="parking" className="w-5" />
//               <span>Parking</span>
//             </div>
//             <div className="flex gap-2">
//               <input type="checkbox" id="furnished" className="w-5" />
//               <span>furnished</span>
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <label>Sort:</label>
//             <select id="sort_order" className="border rounded-lg p-3">
//               <option value="">Price hight to low</option>
//               <option value="">Price low to hight</option>
//               <option value="">Latest</option>
//               <option value="">Oldest</option>
//             </select>
//           </div>
//           <button className="bg-slate-700 test-white p-3 rounded-lg uppercase hover:opacity-95">
//             Serch
//           </button>
//         </form>
//       </div>
//       <div className="">
//         <h1>Listing Results:</h1>
//       </div>
//     </div>
//   );
// };

// export default Search;

const Search = () => {
  return (
    <div className="flex flex-col md:flex-row bg-gray-50">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen bg-white shadow-lg">
        <form className="flex flex-col gap-8">
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
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-slate-400 outline-none transition"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label className="text-sm font-semibold text-gray-700">Type:</label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" id="all" className="w-5 h-5" />
                <span>Rent & Sale</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" id="rent" className="w-5 h-5" />
                <span>Rent</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" id="sale" className="w-5 h-5" />
                <span>Sale</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" id="offer" className="w-5 h-5" />
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
                <input type="checkbox" id="parking" className="w-5 h-5" />
                <span>Parking</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" id="furnished" className="w-5 h-5" />
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
            >
              <option value="">Price: High to Low</option>
              <option value="">Price: Low to High</option>
              <option value="">Latest</option>
              <option value="">Oldest</option>
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
