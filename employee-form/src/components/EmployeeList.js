import { Link } from "react-router-dom";

export default function EmployeeList({ employees }) {
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
                    <li key={e.EmployeeId}>
                        <Link to={`/employees/${e.EmployeeId}`}>{e.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
