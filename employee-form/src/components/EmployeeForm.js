import React from 'react';
// If you created the CSS file, keep this import. If not, you can delete it.
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
        console.log(this.state);
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
