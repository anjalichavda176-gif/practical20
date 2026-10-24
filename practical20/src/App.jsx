
import { useEffect, useState } from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import "./App.css";

const API_URL = "http://localhost:3001/employees";

const initialForm = {
  name: "",
  email: "",
  department: "",
  salary: "",
};

function App() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Could not fetch employees");
      }

      const data = await response.json();
      setEmployees(data);
      setMessage("");
    } catch {
      setMessage(
        "API connection failed. Please start the JSON Server."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const employeeData = {
      ...formData,
      salary: Number(formData.salary),
    };

    try {
      const response = await fetch(
        editingId ? `${API_URL}/${editingId}` : API_URL,
        {
          method: editingId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employeeData),
        }
      );

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setFormData(initialForm);
      setEditingId(null);
      setMessage(
        editingId
          ? "Employee updated successfully!"
          : "Employee added successfully!"
      );

      await fetchEmployees();
    } catch {
      setMessage("Operation failed. Please check the API server.");
    }
  };

  const handleEdit = (employee) => {
    setFormData({
      name: employee.name,
      email: employee.email,
      department: employee.department,
      salary: String(employee.salary),
    });

    setEditingId(employee.id);
    setMessage("");
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      if (String(editingId) === String(id)) {
        setEditingId(null);
        setFormData(initialForm);
      }

      setMessage("Employee deleted successfully!");
      await fetchEmployees();
    } catch {
      setMessage("Could not delete employee.");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData(initialForm);
    setMessage("");
  };

  return (
    <div className="container">
      <h1>Employee Management System</h1>
      <p className="subtitle">Manage your employees easily</p>

      {message && <p className="message">{message}</p>}

      <section>
        <h2>{editingId ? "Edit Employee" : "Add Employee"}</h2>

        <EmployeeForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          editingId={editingId}
          onCancel={handleCancel}
        />
      </section>

      <section>
        <h2>Employee List</h2>

        {loading ? (
          <p>Loading employees...</p>
        ) : (
          <EmployeeList
            employees={employees}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </section>
    </div>
  );
}

export default App;

