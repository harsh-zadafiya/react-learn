import { Component } from "react";
import EmpRow from "./EmpRow";

class EmpTable extends Component {
  render() {
    const { emps, handleDelete } = this.props;

    const empRow = emps.map((emp) => {
      return <EmpRow emp={emp} handleDelete={handleDelete} />;
    });

    return (
      <div className="container">
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Joining Date</th>
              <th>Title</th>
              <th>Department</th>
              <th>Employee Type</th>
              <th>Status</th>
              <th>Day(s) Left for Retirement</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{empRow}</tbody>
        </table>
      </div>
    );
  }
}

export default EmpTable;
