import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function EmployeeList() {
    const employees = useSelector((state) => state.employees);

    const [search, setSearch] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("all");
    const [sortBy, setSortBy] = useState("name");

    const departments = useMemo(() => {
        const set = new Set();
        employees.forEach((e) => {
            if (e.department) set.add(e.department);
        });
        return Array.from(set);
    }, [employees]);

    const filteredEmployees = useMemo(() => {
        let result = [...employees];

        if (search.trim()) {
            const term = search.toLowerCase();
            result = result.filter((e) =>
                (e.name || "").toLowerCase().includes(term)
            );
        }

        if (departmentFilter !== "all") {
            result = result.filter((e) => e.department === departmentFilter);
        }

        result.sort((a, b) => {
            const aVal = (a[sortBy] || "").toLowerCase();
            const bVal = (b[sortBy] || "").toLowerCase();
            if (aVal < bVal) return -1;
            if (aVal > bVal) return 1;
            return 0;
        });

        return result;
    }, [employees, search, departmentFilter, sortBy]);

    return (
        <div className="page">
            <div className="toolbar card">
                <div className="toolbar-group">
                    <label>
                        Search by name:
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Start typing a name…"
                        />
                    </label>
                </div>

                <div className="toolbar-group">
                    <label>
                        Filter by department:
                        <select
                            value={departmentFilter}
                            onChange={(e) => setDepartmentFilter(e.target.value)}
                        >
                            <option value="all">All</option>
                            {departments.map((d) => (
                                <option key={d} value={d}>
                                    {d}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="toolbar-group">
                    <label>
                        Sort by:
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="name">Name</option>
                            <option value="department">Department</option>
                        </select>
                    </label>
                </div>
            </div>

            {filteredEmployees.length === 0 ? (
                <p>No employees found. Try changing your filters.</p>
            ) : (
                <div className="grid">
                    {filteredEmployees.map((emp) => (
                        <article key={emp.id} className="card employee-card">
                            <h3>{emp.name}</h3>
                            <p className="muted">
                                {emp.title ? emp.title + " · " : ""}
                                {emp.department}
                            </p>
                            <p className="muted small">{emp.email}</p>
                            <div className="card-actions">
                                <Link className="btn" to={`/employees/${emp.id}`}>
                                    View
                                </Link>
                                <Link className="btn secondary" to={`/employees/${emp.id}/edit`}>
                                    Edit
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}
