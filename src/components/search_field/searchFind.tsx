import { SearchFieldProps } from "./types";


function SearchField({
  inputValue, 
  inputOnChange, 
  buttonOnClick
}: SearchFieldProps) {
  return (
    <div>
      <input type="text" value={inputValue} onChange={inputOnChange} />
      <button onClick={buttonOnClick}>Search</button>
    </div>
  );
}

export { SearchField }