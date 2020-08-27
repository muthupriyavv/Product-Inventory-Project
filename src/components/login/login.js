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
            userList: [],
            alert:false
        }
        this.setEmail = this.setEmail.bind(this)
        this.setPassword = this.setPassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getAllUsers = this.getAllUsers.bind(this)
        this.validate = this.validate.bind(this)
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

    validate() {
        let emailError = "";
        let passwordError = "";

        if (!this.state.email) {
            emailError = "Email is required"
        }

        if (!this.state.password) {
            passwordError = "Password is required"
        }

        if (emailError || passwordError) {
            this.setState({ emailError, passwordError })
            return false
        }
        return true
    }

    setEmail(e) {
        let emailError = "";
        this.setState({
            email: e.target.value
        }, () => {
            if (this.state.email === "") {
                emailError = "Email is required"
            }
            if (this.state.email !== "") {
                let lastAtPos = this.state.email.lastIndexOf('@');
                let lastDotPos = this.state.email.lastIndexOf('.');
                let length = this.state.email.length;
                if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') === -1 && lastDotPos > 2 && (lastDotPos - lastAtPos) > 2 && (length - lastDotPos) > 2)) {
                    emailError = "Email is Invalid"
                }
            }
            if (emailError) {
                this.setState({ emailError })
            }
        })
        this.setState({
            emailError: ""
        })

    }

    setPassword(e) {
        let passwordError = "";
        this.setState({
            password: e.target.value
        }, () => {
            if (this.state.password === "") {
                passwordError = "password is required"
            }
            if (passwordError) {
                this.setState({ passwordError })
            }
        })
        this.setState({
            passwordError: ""
        })
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
               this.setState({
                    alert:true
               })

            }
        }
    }

    render() {
        return (
            <div className="loginBackdrop">
                <form className="loginContainer">
                    <h3 style={{ textAlign: "center" }}>Login</h3>
                    <hr></hr>
                    {this.state.alert ? 
                        <div class="w3-panel w3-red w3-display-container">
                        <p>Wrong Credentials</p>
                      </div> 
                    : ("") }
                    <div>
                        <label><b>Email</b></label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            onChange={this.setEmail}
                            id="email"
                            required
                        />
                        <p style={{ color: "red" }}>{this.state.emailError}</p>
                    </div>


                    <div>
                        <label><b>Password</b></label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            id="password"
                            onChange={this.setPassword}
                            required
                        />
                        <p style={{ color: "red" }}>{this.state.passwordError}</p>
                    </div>

                    <div className="clearfix">
                        <button type="submit" onClick={this.handleSubmit} data-testid="login"
                            className="signinbtn">LOGIN</button>
                        <br>
                        </br>
                        <div className="signuplink">
                            <Link to="/signup">New User? Sign Up</Link>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

}

export default Login;