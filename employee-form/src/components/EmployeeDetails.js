import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export default function EmployeeDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const employees = useSelector((state) => state.employees);
    const employee = employees.find((emp) => emp.id === id);

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

        dispatch({ type: "DELETE_EMPLOYEE", payload: employee.id });
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

                {/* Add other fields if you have them */}

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
