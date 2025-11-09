import React from "react";
import "./EmployeeForm.css";

class EmployeeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: "", email: "", title: "", department: "" };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, title, department } = this.state;

        const newEmployee = {
            name: name.trim(),
            email: String(email).trim().toLowerCase(),
            title: title.trim(),
            department: department.trim(),
        };

        this.props.addEmployee(newEmployee);
        this.setState({ name: "", email: "", title: "", department: "" });
    };

    render() {
        const { name, email, title, department } = this.state;
        return (
            <form onSubmit={this.handleSubmit} className="employee-form">
                <label>
                    Name
                    <input type="text" name="name" value={name} onChange={this.handleChange} required />
                </label>

                <label>
                    Email
                    <input type="email" name="email" value={email} onChange={this.handleChange} required />
                </label>

                <label>
                    Job Title
                    <input type="text" name="title" value={title} onChange={this.handleChange} required />
                </label>

                <label>
                    Department
                    <input type="text" name="department" value={department} onChange={this.handleChange} required />
                </label>

                <button type="submit">Add Employee</button>
            </form>
        );
    }
}

export default EmployeeForm;
