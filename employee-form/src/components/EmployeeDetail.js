import { useParams, Link, useNavigate } from "react-router-dom";

export default function EmployeeDetail({ employees, onRemove }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const emp = employees.find((e) => String(e.EmployeeId) === String(id));

    if (!emp) {
        return (
            <div className="employee-detail">
                <p>Employee not found.</p>
                <Link to="/">← Back to list</Link>
            </div>
        );
    }

    const handleDelete = () => {
        if (window.confirm(`Delete ${emp.name}?`)) {
            onRemove(emp.EmployeeId);
            navigate("/"); // return to list after delete
        }
    };

    return (
        <div className="employee-detail">
            <h1>{emp.name}</h1>
            <p><strong>ID:</strong> {emp.EmployeeId}</p>
            <p><strong>Title:</strong> {emp.title || "N/A"}</p>
            <p><strong>Email:</strong> {emp.email || "N/A"}</p>
            <p><strong>Department:</strong> {emp.department || "N/A"}</p>
            <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                <Link to="/">← Back to list</Link>
                <button type="button" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
}
