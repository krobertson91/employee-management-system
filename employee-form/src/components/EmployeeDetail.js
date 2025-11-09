import { useParams, Link } from "react-router-dom";

export default function EmployeeDetail({ employees }) {
    const { id } = useParams();
    const emp = employees.find((e) => String(e.EmployeeId) === String(id));

    if (!emp) {
        return (
            <div className="employee-detail">
                <p>Employee not found.</p>
                <Link to="/">← Back to list</Link>
            </div>
        );
    }

    return (
        <div className="employee-detail">
            <h1>{emp.name}</h1>
            <p><strong>ID:</strong> {emp.EmployeeId}</p>
            <p><strong>Title:</strong> {emp.title}</p>
            <p><strong>Email:</strong> {emp.email}</p>
            <Link to="/">← Back to list</Link>
        </div>
    );
}
