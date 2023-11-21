import { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class EmpAdd extends Component {
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
        alert("Empployee Added");
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    //change issueAdd
    const form = document.forms.empAdd;
    //change createIssue
    if (form.first_name.value === "") {
      toast.warn("Please add Your first name");
    } else if (form.last_name.value === "") {
      toast.warn("Please add last name");
    } else if (form.age.value === "" || isNaN(form.age.value)) {
      toast.warn("Please add valid Age");
    } else {
      this.createEmployee({
        first_name: form.first_name.value,
        last_name: form.last_name.value,
        age: form.age.value,
        joining_date: form.joining_date.value,
        title: form.title.value,
        dept: form.dept.value,
        emp_type: form.emp_type.value,
        status: form.status.value,
      });
      form.first_name.value = "";
      form.last_name.value = "";
      form.age.value = "";
      form.joining_date.value = "";
      form.title.value = "";
      form.dept.value = "";
      form.emp_type.value = "";
      form.status.value = "Working";
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
              className="form-control"
              placeholder="First Name"
            />
          </div>
          <div className="form-group mt-3">
            <input
              type="text"
              name="last_name"
              className="form-control"
              placeholder="Last Name"
            />
          </div>
          <div className="form-group mt-3">
            <input
              type="text"
              name="age"
              className="form-control"
              placeholder="Age"
            />
          </div>
          <div className="form-group mt-3">
            <input
              type="text"
              name="joining_date"
              className="form-control"
              placeholder="Joining Date"
            />
          </div>
          <div className="form-group mt-3">
            <select name="title" className="form-control">
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
            <select name="dept" className="form-control">
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
            <select name="emp_type" className="form-control">
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
            <input
              type="text"
              name="status"
              className="form-control"
              placeholder="Status"
            />
          </div>
          <button type="submit" className="btn btn-primary mt-4">
            Add
          </button>
        </form>
      </div>
    );
  }
}

export default EmpAdd;
