import React from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import axios from 'axios'


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
            userList: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getAllUsers = this.getAllUsers.bind(this)
    }

    UNSAFE_componentWillMount() {
        this.getAllUsers()
    }

    async getAllUsers() {
        await axios.get("http://localhost:3001/users").then((responseData) => {
            this.setState({
                userList: responseData.data
            })
        })
        console.log(this.state.userList.length)
    }


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })

    }

    validate() {
        let emailError = "";
        let passwordError = "";

        if (!this.state.email) {
            emailError = "Email is required"
        }

        if (this.state.email !== undefined) {
            let lastAtPos = this.state.email.lastIndexOf('@');
            let lastDotPos = this.state.email.lastIndexOf('.');
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') == -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
                emailError = "Email is Invalid"
            }
        }

        if (!this.state.password) {
            passwordError = "Password is required"
        }

        if (emailError || passwordError) {
            this.setState({ emailError, passwordError })
            return false;
        }

        return true;
    }

    handleSubmit(event) {
        event.preventDefault();

        const isValid = this.validate();

        if (isValid) {
            const userDetails = {
                email: this.state.email,
                password: this.state.password
            }
            for (var i = 0; i < this.state.userList.length; i++) {
                if (userDetails.email === this.state.userList[i].email && userDetails.password === this.state.userList[i].password) {
                    this.props.history.push('/dashboard')
                    break;
                }
            }
            if (i === this.state.userList.length) {
                alert('wrong credentials')

            }
        }
    }

    render() {
        return (
            <div className="loginBackdrop">
                <form className="loginContainer">

                    <h1 style={{ textAlign: "center" }}>Login</h1>
                    <hr></hr>
                    <label><b>Email</b></label>
                    <input
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        onChange={this.handleChange}
                        required
                    />
                    <p style={{ fontSize: "12", color: 'red' }}>{this.state.emailError}</p>

                    <label><b>Password</b></label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        name="password"
                        onChange={this.handleChange}
                        errortext={this.state.passwordError}
                        required
                    />
                    <p style={{ fontSize: "12", color: 'red' }}>{this.state.passwordError}</p>

                    <div className="clearfix">
                        <button type="submit" onClick={this.handleSubmit}
                            className="signinbtn">LOGIN</button>
                        <br>
                        </br>
                        <div className="link">
                            <Link to="/signup">New User? Sign Up</Link>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

}

export default Login;