import React from 'react';
import './EmployeeForm.css';

class EmployeeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '', email: '', title: '', department: '' };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        // Create an employee object from current state
        const newEmployee = {
            name: this.state.name,
            email: this.state.email,
            title: this.state.title,
            department: this.state.department
        };

        // ✅ Call the addEmployee function from App.js
        this.props.addEmployee(newEmployee);

        // Reset the form after submission
        this.setState({ name: '', email: '', title: '', department: '' });
    };

    render() {
        const { name, email, title, department } = this.state;

        return (
            <form onSubmit={this.handleSubmit} className="employee-form">
                <label>
                    Name
                    <input
                        name="name"
                        value={name}
                        onChange={this.handleChange}
                        required
                    />
                </label>

                <label>
                    Email
                    <input
                        name="email"
                        type="email"
                        value={email}
                        onChange={this.handleChange}
                        required
                    />
                </label>

                <label>
                    Job Title
                    <input
                        name="title"
                        value={title}
                        onChange={this.handleChange}
                        required
                    />
                </label>

                <label>
                    Department
                    <input
                        name="department"
                        value={department}
                        onChange={this.handleChange}
                        required
                    />
                </label>

                <button type="submit">Add Employee</button>
            </form>
        );
    }
}

export default EmployeeForm;
