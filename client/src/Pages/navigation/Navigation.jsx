import { Outlet, Link } from "react-router-dom";
import "../../css/navbar.css";

const Navigation = () => {
  return (
    // <div>
    //   <Link to="/">Home</Link>
    //   {" | "}
    //   <Link to="/empadd">Employee Add</Link>
    //   <Outlet />
    // </div>
    <div>
      <nav className="menu-list">
        <div className="logo">
          Employee<font>Management</font>
        </div>
        <ul className="menu-list">
          <li>
            <Link className="nav-link" to="/" style={{ marginRight: "90px" }}>
              Home
            </Link>
          </li>
          <li>
            <Link
              className="nav-link"
              to="/empadd"
              style={{ marginRight: "90px" }}
            >
              Employee Add
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navigation;
