import { HiMagnifyingGlass } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";
import PropTypes from "prop-types";

function Search({ className, placeholder, onSearch, inputClassname }) {
  return (
    <div className={twMerge("relative w-[33%] ", className)}>
      <SearchBar
        placeholder={placeholder}
        name={name}
        onSearch={onSearch}
        inputClassname={inputClassname}
      />
      {/*<SearchSuggestions/>*/}
    </div>
  );
}

export default Search;

Search.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  onSearch: PropTypes.func,
  inputClassname: PropTypes.string,
};

function SearchBar({ placeholder, onSearch, inputClassname }) {
  return (
    <div className="relative">
      <input
        type="search"
        placeholder={placeholder ?? "Search..."}
        className={twMerge(
          "  py-4 px-12  w-full bg-white rounded-xl ",
          inputClassname,
        )}
        onChange={onSearch}
        id=""
      />
      <button
        className="absolute right-8 top-1/2 -translate-y-1/2  text-slate-600 "
        type="submit"
      >
        <HiMagnifyingGlass className="text-3xl" />
      </button>
    </div>
  );
}

// function SearchSuggestions() {
//   return (
//     <div className="suggestions hidden absolute left-0 top-full translate-y-4 py-4 px-8  ">
//       <ul>
//         <li>
//           <a href="">test</a>
//         </li>
//         <li>
//           <a href="">test</a>
//         </li>
//         <li>
//           <a href="">test</a>
//         </li>
//       </ul>
//     </div>
//   );
// }

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  onSearch: PropTypes.func,
  inputClassname: PropTypes.string,
};
