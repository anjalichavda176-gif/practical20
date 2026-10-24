function EmployeeList({ employees, onEdit, onDelete }) {
if (employees.length === 0) {
return <p className="empty-message">No employees found.</p>;
}

return ( <div className="employee-list">
{employees.map((employee) => ( <div className="employee-card" key={employee.id}> <h3>{employee.name}</h3>

```
      <p>
        <strong>Email:</strong> {employee.email}
      </p>

      <p>
        <strong>Department:</strong> {employee.department}
      </p>

      <p>
        <strong>Salary:</strong> ₹{employee.salary}
      </p>

      <div className="card-buttons">
        <button onClick={() => onEdit(employee)}>
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(employee.id)}
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>


);
}

export default EmployeeList;

