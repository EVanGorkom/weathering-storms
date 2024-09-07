import loading_spinner from "../../assets/loading-spinner.png"
import "./loading.css"

function Loading() {
  return (
    <div className="loader-container">
      <div className="loader">Loading...</div>
      <img className="loading-circle" src={loading_spinner} alt="a small circle of dots spinning."/>
    </div>
  );
}

export { Loading }