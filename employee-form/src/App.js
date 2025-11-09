import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import EmployeeDetail from "./components/EmployeeDetail";

const STORAGE_KEY = "employees";

export default function App() {
    // Load BEFORE first render to avoid overwriting storage with []
    const [employees, setEmployees] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    // Persist on any change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
    }, [employees]);

    // Add employee (ensure an id and basic cleanup)
    function addEmployee(newEmployee) {
        const clean = {
            ...newEmployee,
            EmployeeId:
                newEmployee.EmployeeId != null
                    ? String(newEmployee.EmployeeId)
                    : String(Date.now()),
            name: String(newEmployee.name || "").trim(),
        };
        if (!clean.name) return;

        setEmployees((prev) => {
            const exists = prev.some(
                (e) => String(e.EmployeeId) === String(clean.EmployeeId)
            );
            return exists ? prev : [...prev, clean];
        });
    }

    // Delete by id
    function removeEmployee(id) {
        setEmployees((prev) =>
            prev.filter((e) => String(e.EmployeeId) !== String(id))
        );
    }

    return (
        <BrowserRouter>
            {/* simple global header */}
            <header style={{ marginBottom: "1rem" }}>
                <Link to="/" style={{ textDecoration: "none", fontWeight: 600 }}>
                    🏠 Home
                </Link>
            </header>

            <Routes>
                <Route
                    path="/"
                    element={
                        <div className="App">
                            <h1>New Employee</h1>
                            <EmployeeForm addEmployee={addEmployee} />
                            <h2>Employee List</h2>
                            <EmployeeList employees={employees} onRemove={removeEmployee} />
                        </div>
                    }
                />
                <Route
                    path="/employees/:id"
                    element={
                        <EmployeeDetail employees={employees} onRemove={removeEmployee} />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
