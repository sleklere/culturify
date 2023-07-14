import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Loading() {
  return (
    <div className="loading-container">
      <FontAwesomeIcon icon={faSpinner} className="spinner" />
    </div>
  );
}

export default Loading;
