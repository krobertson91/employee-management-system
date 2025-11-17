import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";

import {EmployeeProvider, useEmployees} from "./EmployeeContext";
import EmployeeList from "./components/EmployeeList";
import EmployeeDetails from "./components/EmployeeDetails";
import EmployeeForm from "./components/EmployeeForm";
import "./App.css";


// Page for adding a new employee
function AddEmployeePage() {
    const navigate = useNavigate();
    const { addEmployee } = useEmployees();

    function handleSubmit(formData) {
        addEmployee(formData);
        navigate("/");
    }

    return (
        <div className="page">
            <h2>Add Employee</h2>
            <EmployeeForm onSubmit={handleSubmit} />
        </div>
    );
}

// Page for editing an existing employee
function EditEmployeePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getEmployeeById, updateEmployee } = useEmployees();

    const employee = getEmployeeById(id);

    function handleSubmit(formData) {
        updateEmployee(id, formData);
        navigate(`/employees/${id}`);
    }

    if (!employee) {
        return (
            <div className="page">
                <p>Employee not found.</p>
            </div>
        );
    }

    return (
        <div className="page">
            <h2>Edit Employee</h2>
            <EmployeeForm initialEmployee={employee} onSubmit={handleSubmit} />
        </div>
    );
}

export default function App() {
    return (
        <EmployeeProvider>
            <Router>
                <div className="app">
                    <header className="app-header">
                        <h1>Employee Management System</h1>
                        <nav>
                            <Link to="/">Employees</Link>
                            <Link to="/add">Add Employee</Link>
                        </nav>
                    </header>

                    <main className="app-main">
                        <Routes>
                            <Route path="/" element={<EmployeeList />} />
                            <Route path="/add" element={<AddEmployeePage />} />
                            <Route path="/employees/:id" element={<EmployeeDetails />} />
                            <Route path="/employees/:id/edit" element={<EditEmployeePage />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </EmployeeProvider>
    );
}
