import { Link } from "react-router-dom";

const EmpRow = ({ emp }) => {
  console.log(emp);
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
        <Link to={`/emp/${emp._id}`}>View EMp</Link>
      </td>
    </tr>
  );
};

export default EmpRow;
