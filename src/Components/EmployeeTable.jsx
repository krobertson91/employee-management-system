const DUMMY_EMPLOYEES = [
    { id: 1, name: "Alex Johnson", role: "Software Engineer", department: "IT", email: "alex.johnson@example.com"},
    { id: 2, name: "Priya Singh", role: "Product Owner", department: "Product", email: "priya.singh@example.com"},
    { id: 3, name: "Marcus Lee", role: "Service Tech", department: "Operations", email: "marcus.lee@example.com"},
];

const th = { textAlign: "left", borderBottom: "1px solid #ddd", padding: "0.5rem" };
const td = { borderBottom: "1px solid #f0f0f0", padding: "0.5rem" };

export default function EmployeeTable() {
    return (
        <main style = {{ padding: "1rem" }}>
            <h2>Employees</h2>
            <table style = {{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                <tr>
                    <th style = {th}>ID</th>
                    <th style = {th}>Name</th>
                    <th style = {th}>Role</th>
                    <th style = {th}>Department</th>
                    <th style = {th}>Email</th>
                </tr>
                </thead>
                <tbody>
                {DUMMY_EMPLOYEES.map((emp) => (
                    <tr key = {emp.id}>
                      <td style={td}>{emp.id}</td>
                      <td style={td}>{emp.name}</td>
                      <td style={td}>{emp.role}</td>
                      <td style={td}>{emp.department}</td>
                      <td style={td}>{emp.email}</td>
                </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}
