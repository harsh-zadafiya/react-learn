import { Component } from "react";
import EmpTable from "./EmpTable";

class EmpList extends Component {
  constructor() {
    super();
    this.state = {
      name: "Employee Details",
      emps: [],
      orignalEmpList: [],
      empType: "AllEmployee",
    };
  }

  handleEmpTypeChange = (e) => {
    const employeeType = e.target.value;
    this.setState({ empType: employeeType });

    if (employeeType !== "AllEmployee") {
      const employees = this.state.orignalEmpList.filter(
        (emp) => emp.emp_type == employeeType
      );

      this.setState({ emps: employees });
    } else {
      this.setState({ emps: this.state.orignalEmpList });
    }
  };

  componentDidMount() {
    fetch("/graphql", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        query: `query {
            empList {
              _id
              first_name
              last_name
              age
              joining_date
              title
              dept
              emp_type
              status
            }
          }`,
      }),
    })
      .then((res) => res.json())
      .then((body) => {
        this.setState({
          emps: body.data.empList,
          orignalEmpList: body.data.empList,
        });
      });
  }

  render() {
    return (
      <div className="container">
        <div>
          <label>Empployee Type</label>
          <select
            value={this.state.empType}
            onChange={this.handleEmpTypeChange}
          >
            <option value="AllEmployee">All Employee</option>
            <option value="FullTime">FullTimeEmployee</option>
            <option value="PartTime">PartTimeEmployee</option>
            <option value="Contract">ContractEmployee</option>
            <option value="Seasonal">SeasonalEmployee</option>
          </select>
        </div>
        <h1 className="display-4">{this.state.name}</h1> <hr className="my-4" />
        <EmpTable emps={this.state.emps} /> <hr className="my-4" />
      </div>
    );
  }
}

export default EmpList;
