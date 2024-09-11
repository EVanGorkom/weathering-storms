import { SearchFieldProps } from "./types";


function SearchField({
  inputValue, 
  inputOnChange, 
  buttonOnClick
}: SearchFieldProps) {
  return (
    <div className="space-x-3">
      <input className="bg-slate-400" type="text" value={inputValue} onChange={inputOnChange} />
      <button className="bg-blue-950 p-2 rounded-md text-white" onClick={buttonOnClick}>Search</button>
    </div>
  );
}

export { SearchField }