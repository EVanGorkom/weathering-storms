import loading_spinner from "../../assets/loading-spinner.png"
import "./loading.css"

function Loading() {
  return (
    <div className="loader-container flex p-20 place-content-center">
      <div className="loader text-white">Loading...</div>
      <img
        className="loading-circle"
        src={loading_spinner}
        alt="a small circle of dots spinning."
      />
    </div>
  );
}

export { Loading }