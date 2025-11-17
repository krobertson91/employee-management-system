import React, { useState, useEffect } from "react";

const EMPTY_EMPLOYEE = {
    name: "",
    department: "",
    title: "",
    email: "",
};

export default function EmployeeForm({ initialEmployee, onSubmit }) {
    const [form, setForm] = useState(EMPTY_EMPLOYEE);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialEmployee) {
            setForm({
                name: initialEmployee.name || "",
                department: initialEmployee.department || "",
                title: initialEmployee.title || "",
                email: initialEmployee.email || "",
            });
        }
    }, [initialEmployee]);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function validate() {
        const newErrors = {};

        if (!form.name.trim()) {
            newErrors.name = "Name is required.";
        }
        if (!form.department.trim()) {
            newErrors.department = "Department is required.";
        }
        if (!form.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = "Enter a valid email address.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!validate()) return;
        onSubmit(form);
    }

    return (
        <form className="card form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
                <label>
                    Name
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        type="text"
                    />
                </label>
                {errors.name && <p className="error">{errors.name}</p>}
            </div>

            <div className="form-row">
                <label>
                    Department
                    <input
                        name="department"
                        value={form.department}
                        onChange={handleChange}
                        type="text"
                    />
                </label>
                {errors.department && <p className="error">{errors.department}</p>}
            </div>

            <div className="form-row">
                <label>
                    Title
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        type="text"
                    />
                </label>
            </div>

            <div className="form-row">
                <label>
                    Email
                    <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        type="email"
                    />
                </label>
                {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <button className="btn primary" type="submit">
                {initialEmployee ? "Save Changes" : "Add Employee"}
            </button>
        </form>
    );
}
