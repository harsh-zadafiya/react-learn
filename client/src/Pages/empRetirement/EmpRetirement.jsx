import moment from "moment";
import Moment from "moment";
import React, { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import EmpTable from "../../components/EmpTable";

class EmpRetirement extends Component {
  constructor() {
    super();
    this.state = {
      name: "Upcoming Retirement",
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
        (emp) => emp.emp_type === employeeType
      );

      this.setState({ emps: employees });
    } else {
      this.setState({ emps: this.state.orignalEmpList });
    }
  };

  getAllEmployee = () => {
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
        // eslint-disable-next-line
        const upcomingRetirements = body.data.empList.filter((emp) => {
          const joiningDate = moment(emp.joining_date);
          const retirementAge = 65 - emp.age; // Assuming the company retirement age is 65
          const retirementDate = Moment(joiningDate).add(
            retirementAge,
            "years"
          );

          const today = Moment();
          const timeLeft = Moment.duration(retirementDate.diff(today));
          const yearsLeft = timeLeft.years();
          const monthsLeft = timeLeft.months();
          const daysLeft = timeLeft.days();

          if (
            ((yearsLeft < 0 || (yearsLeft === 0 && monthsLeft <= 6)) &&
              timeLeft.asMonths() <= 6) ||
            (yearsLeft === 0 && monthsLeft === 6 && daysLeft === 0)
          )
            return emp;
        });
        this.setState({
          emps: upcomingRetirements,
          orignalEmpList: upcomingRetirements,
        });
      });
  };

  componentDidMount() {
    this.getAllEmployee();
  }

  deleteEmployee = (empid) => {
    fetch("/graphql", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation Mutation($empDeleteId: ID!) {
                empDelete(id: $empDeleteId)
              }`,
        variables: { empDeleteId: empid },
      }),
    })
      .then((res) => res.json())
      .then((body) => {
        this.getAllEmployee();
        toast.success("Empployee Deleted");
      });
  };

  handleDelete = (id, status) => {
    if (status === "Working") {
      toast.warn("Oops!! You can not delete Working Employee");
    } else if (id) {
      this.deleteEmployee(id);
    }
  };

  render() {
    return (
      <div className="container">
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
        <div className="mt-4 mb-4">
          <label className="me-3">Empployee Type</label>
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
        <EmpTable
          emps={this.state.emps}
          handleDelete={this.handleDelete}
        />{" "}
        <hr className="my-4" />
      </div>
    );
  }
}

export default EmpRetirement;
