import { Link } from "react-router-dom";

export default function EmployeeList({ employees, onRemove }) {
    if (!employees?.length) {
        return (
            <div className="employee-list">
                <h1>Employee List</h1>
                <p>No employees yet. Use the form to add some!</p>
            </div>
        );
    }

    return (
        <div className="employee-list">
            <h1>Employee List</h1>
            <ul>
                {employees.map((e) => (
                    <li
                        key={e.EmployeeId}
                        style={{ display: "flex", gap: "10px", alignItems: "center" }}
                    >
                        <Link to={`/employees/${e.EmployeeId}`}>{e.name}</Link>
                        <button
                            type="button"
                            onClick={() => {
                                if (window.confirm(`Delete ${e.name}?`)) onRemove(e.EmployeeId);
                            }}
                            aria-label={`Delete ${e.name}`}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
