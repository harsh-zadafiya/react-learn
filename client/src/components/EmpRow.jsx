// const IssueRow = ({issue}) => {
//     return (
//         <tr>
//             <td>{issue.id}</td>
//             <td>{issue.status}</td>
//             <td>{issue.owner}</td>
//             <td>{issue.created != null ? issue.created.toDateString() : ''}</td>
//             <td>{issue.effort}</td>
//             <td>{issue.completionDate != null ? issue.completionDate.toDateString() : ''}</td>
//             <td>{issue.title}</td>
//         </tr>
//     );
// }

// export default IssueRow;

const EmpRow = ({ emp }) => {
  console.log(emp);
  return (
    <tr>
      <td>{emp.first_name}</td>
      <td>{emp.last_name}</td>
      <td>{emp.age}</td>
      <td>{emp.joining_date}</td>
      <td>{emp.title}</td>
      <td>{emp.dept}</td>
      <td>{emp.emp_type}</td>
      <td>{emp.status ? "Working" : "Retired"}</td>
    </tr>
  );
};

export default EmpRow;
