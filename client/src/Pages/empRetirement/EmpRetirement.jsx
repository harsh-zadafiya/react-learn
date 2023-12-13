import moment from "moment";
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
        (emp) => emp.emp_type == employeeType
      );

      this.setState({ emps: employees });
    } else {
      this.setState({ emps: this.state.orignalEmpList });
    }
  };

  retirementEmployee = () => {
    const currentDate = moment();
    const sixMonthsFromNow = moment().add(6, "months");

    const upcomingRetirements = this.state.emps.filter((emp) => {
      const joiningDate = moment(emp.joining_date);
      const retirementDate = joiningDate.clone().add(65, "years"); // Assuming retirement age is 65

      return retirementDate.isBetween(currentDate, sixMonthsFromNow);
    });
    console.log(upcomingRetirements);
    this.setState({ emps: upcomingRetirements });
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
        this.setState({
          emps: body.data.empList,
          orignalEmpList: body.data.empList,
        });
      });
  };

  componentDidMount() {
    this.retirementEmployee();
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
