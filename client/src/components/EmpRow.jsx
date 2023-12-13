import { Link } from "react-router-dom";
import Moment from "moment";
import "../css/common.css";
import { Icon } from "@iconify/react";
import moment from "moment";
const EmpRow = ({ emp, handleDelete }) => {
  console.log(emp.joining_date);
  function upcomingRetirement(dateOfJoining, currentAge) {
    const retirementAge = 65 - currentAge; // Assuming the company retirement age is 65
    const retirementDate = Moment(dateOfJoining).add(retirementAge, "years");

    // Calculate time left until retirement
    const today = Moment();
    const timeLeft = Moment.duration(retirementDate.diff(today));
    const yearsLeft = timeLeft.years();
    const monthsLeft = timeLeft.months();
    const daysLeft = timeLeft.days();

    return (
      yearsLeft + "year(s) " + monthsLeft + "month(s) " + daysLeft + "day(s)."
    );
  }
  return (
    <tr>
      <td>{emp.first_name}</td>
      <td>{emp.last_name}</td>
      <td>{emp.age}</td>
      <td>{moment(emp.joining_date).format("YYYY-MM-DD")}</td>
      <td>{emp.title}</td>
      <td>{emp.dept}</td>
      <td>{emp.emp_type}</td>
      <td>{emp.status}</td>
      <td>{upcomingRetirement(emp.joining_date, emp.age)}</td>
      <td>
        <Link className="button" to={`/emp/${emp._id}`}>
          <Icon icon="bxs:user-detail" />
        </Link>{" "}
        <Link className="button" to={`/empUpdate/${emp._id}`}>
          <Icon icon="solar:server-square-update-outline" />
        </Link>{" "}
        <Link
          className="button"
          onClick={() => handleDelete(emp._id, emp.status)}
        >
          <Icon icon="fluent:delete-12-filled" />
        </Link>
      </td>
    </tr>
  );
};

export default EmpRow;
