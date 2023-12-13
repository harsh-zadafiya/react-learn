import React, { Component } from "react";
import { useParams } from "react-router-dom";

class EmpView extends Component {
  constructor() {
    super();
    this.state = {
      name: "Employee Details",
      emp: {},
    };
  }
  componentDidMount() {
    // console.log("optionalParam :: ", this.props);

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
        const allEmployee = body.data.empList;

        if (allEmployee.length > 0) {
          const employee = allEmployee.find((d) => d._id === this.props.empId);

          if (employee) {
            this.setState({
              emp: employee,
            });
          }
        }
      });
  }

  render() {
    const emp = this.state.emp;
    // console.log(emp);
    if (JSON.stringify(emp) === "{}") {
      return <div>No Data Found! </div>;
    }

    return (
      <div>
        <form name="empAdd" className="container">
          <div className="form-group mt-3">
            <input
              disabled
              type="text"
              defaultValue={emp.first_name}
              name="first_name"
              className="form-control"
              placeholder="First Name"
            />
          </div>
          <div className="form-group mt-3">
            <input
              disabled
              type="text"
              name="last_name"
              defaultValue={emp.last_name}
              className="form-control"
              placeholder="Last Name"
            />
          </div>
          <div className="form-group mt-3">
            <input
              disabled
              type="text"
              name="age"
              defaultValue={emp.age}
              className="form-control"
              placeholder="Age"
            />
          </div>
          <div className="form-group mt-3">
            <input
              disabled
              type="text"
              defaultValue={emp.joining_date}
              name="joining_date"
              className="form-control"
              placeholder="Joining Date"
            />
          </div>
          <div className="form-group mt-3">
            <select
              name="title"
              className="form-control"
              value={emp.title}
              disabled
            >
              <option disabled selected value="">
                Select Title
              </option>
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
              <option value="Director">Director</option>
              <option value="VP">VP</option>
            </select>
          </div>
          <div className="form-group mt-3">
            <select
              name="dept"
              className="form-control"
              value={emp.dept}
              disabled
            >
              <option disabled selected value="">
                Select Department
              </option>
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
              <option value="Engineering">Engineering</option>
            </select>
          </div>
          <div className="form-group mt-3">
            <select
              disabled
              name="emp_type"
              className="form-control"
              value={emp.emp_type}
            >
              <option disabled selected value="">
                Select Employment Type
              </option>
              <option value="FullTime">FullTime</option>
              <option value="PartTime">PartTime</option>
              <option value="Contract">Contract</option>
              <option value="Seasonal">Seasonal</option>
            </select>
          </div>
          <div className="form-group mt-3">
            <select
              disabled
              name="status"
              className="form-control"
              value={emp.status}
            >
              <option selected value="">
                Select Status
              </option>
              <option value="Working">Working</option>
              <option value="Retired">Retired</option>
            </select>
          </div>
        </form>
      </div>
    );
  }
}

const EmpViewWithParams = (props) => {
  const { empId } = useParams();

  return <EmpView empId={empId} {...props} />;
};

export default EmpViewWithParams;
