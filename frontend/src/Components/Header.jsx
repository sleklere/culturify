import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = (props) => {
  return (
    <header className={styles.header}>
      <Link to={"/"} className={styles["nav-link"]}>
        App Name
      </Link>
      <nav>
        {/* <Link to={"#"} className={styles["nav-link"]}>
          About
        </Link> */}
        <Link className="btn">Register</Link>
        <Link to={"/login"} className="btn">
          Login
        </Link>
        {/* <a href="#">Profile</a> */}
      </nav>
    </header>
  );
};

export default Header;
