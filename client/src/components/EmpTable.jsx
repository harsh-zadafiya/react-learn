import { Component } from "react";
import EmpRow from "./EmpRow";

class EmpTable extends Component {
  render() {
    const { emps } = this.props;

    const empRow = emps.map((emp) => {
      return <EmpRow emp={emp} />;
    });

    return (
      <div class="container">
        <table class="table table-bordered">
          <thead class="thead-dark">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Joining Date</th>
              <th>Title</th>
              <th>Department</th>
              <th>Employee Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{empRow}</tbody>
        </table>
      </div>
    );
  }
}

export default EmpTable;
