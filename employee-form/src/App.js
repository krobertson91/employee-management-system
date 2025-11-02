import React, { useState, useEffect } from 'react';
import EmployeeForm from './components/EmployeeForm';

function App() {
    // State to store employee data
    const [employees, setEmployees] = useState([]);

    // Function to add a new employee
    function addEmployee(newEmployee) {
        setEmployees((prev) => [...prev, newEmployee]);
    }

    // Function to save employees to local storage
    function saveData() {
        localStorage.setItem('employees', JSON.stringify(employees));
    }

    // Load saved employees when the app starts
    useEffect(() => {
        const savedEmployees = localStorage.getItem('employees');
        if (savedEmployees) {
            setEmployees(JSON.parse(savedEmployees));
        }
    }, []); // runs once when the component first mounts

    // Automatically save whenever employees change
    useEffect(() => {
        localStorage.setItem('employees', JSON.stringify(employees));
    }, [employees]);

    // Function to clear all employees (optional)
    function clearAllEmployees() {
        setEmployees([]);
        localStorage.removeItem('employees');
    }

    return (
        <div className="App">
            <h1>New Employee</h1>

            {/* Pass addEmployee to EmployeeForm */}
            <EmployeeForm addEmployee={addEmployee} />

            {/* Display employee list below the form */}
            <h2>Employee List</h2>
            {employees.length === 0 ? (
                <p>No employees added yet.</p>
            ) : (
                <ul>
                    {employees.map((emp, index) => (
                        <li key={index}>
                            <strong>{emp.name}</strong><br />
                            Email: {emp.email}<br />
                            Title: {emp.title}<br />
                            Department: {emp.department}
                        </li>
                    ))}
                </ul>
            )}

            {/* Buttons for saving and clearing */}
            <button type="button" onClick={saveData}>Save to Local Storage</button>
            <button type="button" onClick={clearAllEmployees}>Clear All Employees</button>
        </div>
    );
}

export default App;
