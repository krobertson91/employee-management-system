import React, { useState, useEffect } from "react";
import EmployeeForm from "./components/EmployeeForm";

const STORAGE_KEY = "employees";

export default function App() {
    const [employees, setEmployees] = useState([]);

    // Load once on mount
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return;
        try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) setEmployees(parsed);
        } catch {
            // corrupted/unexpected data -> start fresh
            setEmployees([]);
        }
    }, []);

    // Persist on every change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
    }, [employees]);

    // Add with simple validation + de-dupe by EmployeeId
    function addEmployee(newEmployee) {
        const clean = {
            ...newEmployee,
            // ensure an id exists if the form didn’t provide one
            EmployeeId:
                newEmployee.EmployeeId != null
                    ? String(newEmployee.EmployeeId)
                    : String(Date.now()),
            name: String(newEmployee.name || "").trim(),
        };

        if (!clean.name) return; // ignore empty names

        setEmployees((prev) => {
            const exists = prev.some(
                (e) => String(e.EmployeeId) === String(clean.EmployeeId)
            );
            return exists ? prev : [...prev, clean];
        });
    }

    // Optional manual save button (not required because of useEffect)
    function saveData() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
    }

    function clearAllEmployees() {
        setEmployees([]);
        localStorage.removeItem(STORAGE_KEY);
    }

    return (
        <div className="App">
            <h1>New Employee</h1>

            {/* EmployeeForm should call props.addEmployee(employeeObject) */}
            <EmployeeForm addEmployee={addEmployee} />

            <h2>Employee List</h2>
            {employees.length === 0 ? (
                <p>No employees added yet.</p>
            ) : (
                <ul>
                    {employees.map((emp) => (
                        <li key={emp.EmployeeId}>
                            <strong>{emp.name}</strong>
                            <br />
                            ID: {emp.EmployeeId}
                            <br />
                            Email: {emp.email}
                            <br />
                            Title: {emp.title}
                            <br />
                            Department: {emp.department}
                        </li>
                    ))}
                </ul>
            )}

            {/* Buttons (manual save is optional) */}
            <button type="button" onClick={saveData}>
                Save to Local Storage
            </button>
            <button type="button" onClick={clearAllEmployees}>
                Clear All Employees
            </button>
        </div>
    );
}
