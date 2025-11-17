import React, { createContext, useContext, useEffect, useState } from "react";

const EmployeeContext = createContext();

const STORAGE_KEY = "employees";

export function EmployeeProvider({ children }) {
    const [employees, setEmployees] = useState([]);

    // Load from localStorage once
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return;
        try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) {
                setEmployees(parsed);
            }
        } catch {
            setEmployees([]);
        }
    }, []);

    // Persist to localStorage whenever employees change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
    }, [employees]);

    function addEmployee(data) {
        const newEmployee = {
            id: Date.now().toString(), // simple unique id
            ...data,
        };
        setEmployees((prev) => [...prev, newEmployee]);
    }

    function updateEmployee(id, updates) {
        setEmployees((prev) =>
            prev.map((emp) =>
                emp.id === id ? { ...emp, ...updates } : emp
            )
        );
    }

    function deleteEmployee(id) {
        setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    }

    function getEmployeeById(id) {
        return employees.find((emp) => emp.id === id);
    }

    const value = {
        employees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        getEmployeeById,
    };

    return (
        <EmployeeContext.Provider value={value}>
            {children}
        </EmployeeContext.Provider>
    );
}

export function useEmployees() {
    const ctx = useContext(EmployeeContext);
    if (!ctx) {
        throw new Error("useEmployees must be used inside EmployeeProvider");
    }
    return ctx;
}
