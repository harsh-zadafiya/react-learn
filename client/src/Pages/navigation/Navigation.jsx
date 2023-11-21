import { Outlet, Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      {" | "}
      <Link to="/empadd">Employee Add</Link>
      <Outlet />
    </div>
  );
};

export default Navigation;
