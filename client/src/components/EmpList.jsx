import { Component } from "react";
import EmpTable from "./EmpTable";
import EmpAdd from "./EmpAdd";

class EmpList extends Component {
  constructor() {
    super();
    this.state = {
      name: "Employee Details",
      emps: [],
    };
  }

  componentDidMount() {
    fetch("/graphql", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        query: `query {
          empList {
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
        this.setState({ emps: body.data.empList });
      });
  }

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
        console.log(body, ".....");
        const { emps } = this.state;
        const newEmpArray = [...emps, body.data.empAdd];
        this.setState({ emps: newEmpArray });
      });
  };

  render() {
    return (
      <div className="container">
        <h1 className="display-4">{this.state.name}</h1> <hr className="my-4" />
        <EmpTable emps={this.state.emps} /> <hr className="my-4" />
        <EmpAdd createEmployee={this.createEmployee} />
      </div>
    );
  }
}

export default EmpList;
