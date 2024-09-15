import { SearchFieldProps } from "./types";
import search_icon from "../../assets/search-icon.png";


function SearchField({
  inputValue, 
  inputOnChange, 
  buttonOnClick
}: SearchFieldProps) {
  return (
    <div className="space-x-2 bg-slate-500">
      <button
        className="align-middle rounded-md text-white"
        onClick={buttonOnClick}
      >
        <img className="h-5 align-middle" src={search_icon} alt="search icon" />
      </button>
      <input
        className="align-middle bg-slate-500 text-white"
        type="text"
        value={inputValue}
        onChange={inputOnChange}
        placeholder="Search"
      />
    </div>
  );
}

export { SearchField }