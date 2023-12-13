import { Component } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class EmpUpdate extends Component {
  constructor() {
    super();
    this.state = {
      emp: {},
    };
  }

  updateEmployee = (emp) => {
    fetch("/graphql", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation Mutation($emp: EmpInputsUpdate) {
            empUpdate(emp: $emp) {
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
          console.log(employee);
          if (employee) {
            this.setState({
              emp: employee,
            });
          }
        }
      });
  }

  handleOnChange = (e) => {
    e.preventDefault();

    this.setState({
      emp: { ...this.state.emp, [`${e.target.name}`]: e.target.value },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    //change createIssue
    if (this.state?.emp.first_name === "") {
      toast.warn("Please add Your first name");
    } else if (this.state?.emp.last_name === "") {
      toast.warn("Please add last name");
    } else if (
      this.state?.emp.age === "" ||
      isNaN(parseInt(this.state?.emp.age))
    ) {
      toast.warn("Please add valid Age");
    } else {
      this.updateEmployee({
        id: this.state.emp._id,
        first_name: this.state?.emp.first_name,
        last_name: this.state?.emp.last_name,
        age: this.state?.emp.age,
        joining_date: this.state?.emp.joining_date,
        title: this.state?.emp.title,
        dept: this.state?.emp.dept,
        emp_type: this.state?.emp.emp_type,
        status: this.state?.emp.status,
      });
      this.setState({
        emp: {},
      });
      toast.success("Empployee Updated");
    }
  };

  render() {
    const employeeDetail = this.state?.emp;

    console.log(employeeDetail);

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
        <form
          name="empUpdate"
          onSubmit={this.handleSubmit}
          className="container"
        >
          <div className="form-group mt-3">
            <input
              type="text"
              name="first_name"
              className="form-control"
              placeholder="First Name"
              onChange={(e) => this.handleOnChange(e)}
              value={employeeDetail?.first_name}
            />
          </div>
          <div className="form-group mt-3">
            <input
              type="text"
              name="last_name"
              className="form-control"
              placeholder="Last Name"
              onChange={(e) => this.handleOnChange(e)}
              value={employeeDetail?.last_name}
            />
          </div>
          <div className="form-group mt-3">
            <input
              type="text"
              name="age"
              className="form-control"
              placeholder="Age"
              onChange={(e) => this.handleOnChange(e)}
              value={employeeDetail?.age}
            />
          </div>
          <div className="form-group mt-3">
            <input
              type="text"
              name="joining_date"
              className="form-control"
              placeholder="Joining Date"
              onChange={(e) => this.handleOnChange(e)}
              value={employeeDetail?.joining_date}
            />
          </div>
          <div className="form-group mt-3">
            <select
              name="title"
              className="form-control"
              onChange={(e) => this.handleOnChange(e)}
              value={employeeDetail?.title}
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
              onChange={(e) => this.handleOnChange(e)}
              value={employeeDetail?.dept}
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
              className="form-control"
              onChange={(e) => this.handleOnChange(e)}
              value={employeeDetail?.emp_type}
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
              className="form-control"
              onChange={(e) => this.handleOnChange(e)}
              value={employeeDetail?.status}
            >
              <option disabled selected value="">
                Select Status
              </option>
              <option value="Working">Working</option>
              <option value="Retired">Retired</option>
            </select>
          </div>
          {/* <div className="form-group mt-3">
            <input
              type="text"
              name="status"
              className="form-control"
              placeholder="Status"
            />
          </div> */}
          <button
            type="submit"
            className="button mt-4 "
            onClick={this.handleUpdate}
          >
            Update Employee
          </button>
        </form>
      </div>
    );
  }
}

const EmpUpdateWithParams = (props) => {
  const { empId } = useParams();
  const navigate = useNavigate();

  return <EmpUpdate empId={empId} {...props} navigate={navigate} />;
};

export default EmpUpdateWithParams;
