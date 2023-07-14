import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LoadingPage() {
  return (
    <div className="loading-page-container">
      <h1>Culturify</h1>
      <FontAwesomeIcon icon={faSpinner} className="spinner" />
    </div>
  );
}

export default LoadingPage;
