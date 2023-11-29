import { Link } from "react-router-dom";
import "../css/common.css";
import { Icon } from "@iconify/react";
const EmpRow = ({ emp, handleDelete }) => {
  // console.log(emp);
  return (
    <tr>
      <td>{emp.first_name}</td>
      <td>{emp.last_name}</td>
      <td>{emp.age}</td>
      <td>{emp.joining_date}</td>
      <td>{emp.title}</td>
      <td>{emp.dept}</td>
      <td>{emp.emp_type}</td>
      <td>{emp.status ? "Working" : "Working"}</td>
      <td>
        <Link className="button" to={`/emp/${emp._id}`}>
          <Icon icon="bxs:user-detail" />
        </Link>{" "}
        <Link className="button" to={`/empUpdate/${emp._id}`}>
          <Icon icon="solar:server-square-update-outline" />
        </Link>{" "}
        <Link className="button" onClick={() => handleDelete(emp._id)}>
          <Icon icon="fluent:delete-12-filled" />
        </Link>
      </td>
    </tr>
  );
};

export default EmpRow;
