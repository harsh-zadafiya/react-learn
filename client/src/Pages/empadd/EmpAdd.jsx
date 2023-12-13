import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

class EmpAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      age: "",
      joining_date: "",
      title: "",
      dept: "",
      emp_type: "",
      status: "Working",
      showmwssage: false,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleDateChange = (date) => {
    this.setState({ joining_date: date });
  };

  createEmployee = (emp) => {
    fetch("/graphql", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation Mutation($emp: EmpInputs) {
            empAdd(emp: $emp) {
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
        variables: { emp },
      }),
    })
      .then((res) => res.json())
      .then((body) => {
        const navigate = this.props.navigate;
        navigate("/");
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      first_name,
      last_name,
      age,
      joining_date,
      title,
      dept,
      emp_type,
      status,
    } = this.state;

    if (first_name === "") {
      toast.warn("Please add Your first name");
    } else if (last_name === "") {
      toast.warn("Please add last name");
    } else if (age === "" || isNaN(age) || age < 20 || age > 64) {
      toast.warn("Please add valid Age");
    } else {
      this.createEmployee({
        first_name,
        last_name,
        age,
        joining_date,
        title,
        dept,
        emp_type,
        status,
      });

      this.setState({
        first_name: "",
        last_name: "",
        age: "",
        joining_date: "",
        title: "",
        dept: "",
        emp_type: "",
        status: "Working",
      });
    }
  };

  render() {
    return (
      <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <form name="empAdd" onSubmit={this.handleSubmit} className="container">
          <div className="form-group mt-3">
            <input
              type="text"
              name="first_name"
              value={this.state.first_name}
              onChange={this.handleChange}
              className="form-control"
              placeholder="First Name"
            />
          </div>
          <div className="form-group mt-3">
            <input
              type="text"
              name="last_name"
              value={this.state.last_name}
              onChange={this.handleChange}
              className="form-control"
              placeholder="Last Name"
            />
          </div>
          <div className="form-group mt-3">
            <input
              type="text"
              name="age"
              value={this.state.age}
              onChange={this.handleChange}
              className="form-control"
              placeholder="Age"
            />
          </div>
          <div className="form-group mt-3">
            <DatePicker
              selected={this.state.joining_date}
              onChange={this.handleDateChange}
              dateFormat="yyyy-MM-dd"
              className="form-control"
              placeholderText="Select Joining Date"
            />
          </div>
          <div className="form-group mt-3">
            <select
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
              className="form-control"
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
              value={this.state.dept}
              onChange={this.handleChange}
              className="form-control"
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
              name="emp_type"
              value={this.state.emp_type}
              onChange={this.handleChange}
              className="form-control"
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
              name="status"
              value={this.state.status}
              onChange={this.handleChange}
              className="form-control"
            >
              <option disabled selected value="">
                Select Status
              </option>
              <option value="Working">Working</option>
              <option value="Retired">Retired</option>
            </select>
          </div>
          <button type="submit" className="button mt-4">
            Add Employee
          </button>
        </form>
      </div>
    );
  }
}

const EmployeeAddWithNavigate = () => {
  const navigate = useNavigate();

  return <EmpAdd navigate={navigate} />;
};
export default EmployeeAddWithNavigate;
