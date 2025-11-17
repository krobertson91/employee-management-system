import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEmployees } from "../EmployeeContext";

export default function EmployeeDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getEmployeeById, deleteEmployee } = useEmployees();

    const employee = getEmployeeById(id);

    if (!employee) {
        return (
            <div className="page">
                <p>Employee not found.</p>
                <Link to="/" className="btn">
                    Back to list
                </Link>
            </div>
        );
    }

    function handleDelete() {
        const confirmed = window.confirm(
            `Are you sure you want to delete ${employee.name}?`
        );
        if (!confirmed) return;
        deleteEmployee(employee.id);
        navigate("/");
    }

    return (
        <div className="page">
            <article className="card">
                <h2>{employee.name}</h2>
                <p className="muted">
                    {employee.title ? employee.title + " · " : ""}
                    {employee.department}
                </p>
                {employee.email && (
                    <p>
                        <strong>Email:</strong> {employee.email}
                    </p>
                )}

                {/* Add any other fields you currently have on the employee object here */}

                <div className="card-actions">
                    <Link className="btn" to={`/employees/${employee.id}/edit`}>
                        Edit
                    </Link>
                    <button className="btn danger" onClick={handleDelete}>
                        Delete
                    </button>
                    <Link className="btn secondary" to="/">
                        Back to list
                    </Link>
                </div>
            </article>
        </div>
    );
}
