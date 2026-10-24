
function EmployeeForm({
  formData,
  setFormData,
  onSubmit,
  editingId,
  onCancel,
}) {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={onSubmit} className="employee-form">
      <label>Employee Name</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter employee name"
        required
      />

      <label>Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter email"
        required
      />

      <label>Department</label>
      <input
        type="text"
        name="department"
        value={formData.department}
        onChange={handleChange}
        placeholder="Enter department"
        required
      />

      <label>Salary</label>
      <input
        type="number"
        name="salary"
        min="0"
        value={formData.salary}
        onChange={handleChange}
        placeholder="Enter salary"
        required
      />

      <button type="submit">
        {editingId ? "Update Employee" : "Add Employee"}
      </button>

      {editingId && (
        <button
          type="button"
          className="cancel-btn"
          onClick={onCancel}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default EmployeeForm;
