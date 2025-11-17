import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import EmployeeList from "./components/EmployeeList";
import EmployeeDetails from "./components/EmployeeDetails";
import EmployeeForm from "./components/EmployeeForm";
import "./App.css";

// -------- Add Employee Page (uses Redux) ----------
function AddEmployeePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleSubmit(formData) {
        const newEmployee = {
            id: Date.now().toString(),
            ...formData,
        };
        dispatch({ type: "ADD_EMPLOYEE", payload: newEmployee });
        navigate("/");
    }

    return (
        <div className="page">
            <h2>Add Employee</h2>
            <EmployeeForm onSubmit={handleSubmit} />
        </div>
    );
}

// -------- Edit Employee Page (uses Redux) ----------
function EditEmployeePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const employees = useSelector((state) => state.employees);
    const employee = employees.find((emp) => emp.id === id);

    function handleSubmit(formData) {
        dispatch({
            type: "UPDATE_EMPLOYEE",
            payload: {
                id,
                updates: formData,
            },
        });
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

// -------- Main App ----------
export default function App() {
    return (
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
    );
}
