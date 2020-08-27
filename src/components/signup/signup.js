import React from 'react';
import { Link } from 'react-router-dom';
import './signup.css';
import axios from 'axios';


class SignUp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
            pswrepeat: '',
            pswrepeatError: '',
            alert:false,
            userList: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.getAllUsers = this.getAllUsers.bind(this);
        this.setEmail = this.setEmail.bind(this)
        this.setPassword = this.setPassword.bind(this)
        this.setConfirmPassword = this.setConfirmPassword.bind(this)
    }

    UNSAFE_componentWillMount() {
        this.getAllUsers()
    }

    validate() {
        let emailError = "";
        let pswrepeatError = "";
        let passwordError = "";

        if (!this.state.email) {
            emailError = "Email is required"
        }

        if (!this.state.password) {
            passwordError = "password is required"
        }

        if (!this.state.pswrepeat) {
            pswrepeatError = "Confirm password is required"
        }

        if (emailError || passwordError || pswrepeatError) {
            this.setState({ emailError, passwordError, pswrepeatError })
            return false;
        }

        return true;
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
            if (this.state.password !== "" && this.state.password.length < 5) {
                passwordError = "password length must be greater than 5"
            }
            if (passwordError) {
                this.setState({ passwordError })
            }
        })
        this.setState({
            passwordError: ""
        })
    }
    
    setConfirmPassword(e){
        let pswrepeatError = "";
        this.setState({
            pswrepeat: e.target.value
        }, () => {
            if (this.state.password !== this.state.pswrepeat) {
                pswrepeatError = "password doesn't match"
            }
            if (pswrepeatError) {
                this.setState({ pswrepeatError })
            }
        })
        this.setState({
            pswrepeatError: ""
        })
    }
    async getAllUsers() {
        await axios.get("http://localhost:3001/users").then((responseData) => {
            this.setState({
                userList: responseData.data
            })
        })
        console.log(this.state.userList.length)
    }


    handleSubmit(event) {
        event.preventDefault();

        const err = this.validate();

        if (err) {
            const userDetails = {
                email: this.state.email,
                password: this.state.password,
                pswrepeat: this.state.pswrepeat
            }
            var flag = 0;
            if (this.state.userList.length !== 0) {
                for (var i = 0; i < this.state.userList.length; i++) {
                    if (userDetails.email === this.state.userList[i].email) {
                        this.setState({
                            alert : true
                        })
                        flag = 1;

                    }
                }
                if (i === this.state.userList.length && flag !== 1) {
                    axios.post("http://localhost:3001/users", userDetails).then((data) => {
                        this.props.history.push('/login')
                    })
                }
            }
            else {
                axios.post("http://localhost:3001/users", userDetails).then((data) => {
                    this.props.history.push('/login')
                })
            }
        }
    }

    render() {
        return (
            <div className="signupBackdrop">
                <form className="signupContainer">
                    <h3>Sign Up</h3>
                    <hr></hr>
                    {this.state.alert ? 
                        <div class="w3-panel w3-red w3-display-container">
                        <p>User Registered Already</p>
                      </div> 
                    : ("") }
                    <label><b>Email</b></label>
                    <input
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        onChange={this.setEmail}
                        id="email"
                        required
                    />
                    <p style={{ fontSize: "10", color: 'red' }}>{this.state.emailError}</p>

                    <label><b>Password</b></label>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        onChange={this.setPassword}
                        id="password"
                        required
                    />
                    <p style={{ fontSize: "10", color: 'red' }}>{this.state.passwordError}</p>

                    <label><b>Confirm Password</b></label>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="pswrepeat"
                        onChange={this.setConfirmPassword}
                        id="pswrepeat"
                        required
                    />
                    <p style={{ fontSize: "10", color: 'red' }}>{this.state.pswrepeatError}</p>
                    <button type="submit" onClick={this.handleSubmit} className="signupbtn">REGISTER</button>
                    <div className="loginlink">
                        <Link to="/login">Existing  User? Login</Link>
                    </div>
                </form>
            </div>
        )
    }

}

export default SignUp;