import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = (props) => {
  // Use Redux for app-wide state 'userLoggedIn'

  return (
    <header className={styles.header}>
      <Link to={"/"} className={styles["nav-link"]}>
        App Name
      </Link>
      <nav>
        {/* <Link className="btn">Register</Link>
        <Link to={"/login"} className="btn">
        Login
      </Link> */}
        <Link
          to={"#"}
          className={`${styles["profile-link"]} ${styles["nav-link"]}`}
        >
          <div className={styles["nav-profile-img"]}></div>
          Profile
        </Link>
        <Link to={"#"} className="btn">
          Logout
        </Link>
      </nav>
    </header>
  );
};

export default Header;
