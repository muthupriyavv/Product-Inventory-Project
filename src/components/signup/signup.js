import React from 'react';
import { Link } from 'react-router-dom';
import './signup.css';
import axios from 'axios';


class SignUp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            emailError:'',
            username: '',
            usernameError:'',
            contact: '',
            contactError:'',
            password: '',
            passwordError:'',
            pswrepeat: '',
            pswrepeatError:'',
            userList: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getAllUsers = this.getAllUsers.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    componentWillMount() {
        this.getAllUsers()
    }

    validate(){
        let emailError="";
        let usernameError="";
        let contactError="";
        let pswrepeatError="";
        let passwordError="";

        if(!this.state.email){
            emailError = "Email is required"
        }

        if (this.state.email !== undefined) {
            let lastAtPos = this.state.email.lastIndexOf('@');
            let lastDotPos = this.state.email.lastIndexOf('.');
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') == -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
                emailError = "Email is Invalid"
            }
        }

        if(!this.state.username){
            usernameError = "Username is required"
        }

        if(!this.state.contact){
            contactError = "Contact is required"
        }

        if(this.state.contact !== undefined){
            var pattern = new RegExp(/^[0-9\b]+$/)
            if(!pattern.test(this.state.contact)){
                contactError="please enter only number"
            }
            else if(this.state.contact.length !==10){
                contactError="please enter valid phone number"
            }
        }

        if(!this.state.password){
            passwordError="password is required"
        }

        if(!this.state.pswrepeat){
            pswrepeatError="Confirm password is required"
        }

        if(this.state.password !== undefined && this.state.pswrepeat !== undefined){
            if(this.state.password !== this.state.pswrepeat){
                pswrepeatError="Passwords dont match"
            }
        }

        if (emailError || usernameError || contactError || passwordError || pswrepeatError) {
            this.setState({ emailError, usernameError ,contactError,passwordError,pswrepeatError })
            return false;
        }

        return true;


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

        if(err)
        {
        const userDetails = {
            email: this.state.email,
            username: this.state.username,
            contact: this.state.contact,
            password: this.state.password
        }
        var flag = 0;
        if (this.state.userList.length !== 0) {
            for (var i = 0; i < this.state.userList.length; i++) {
                if (userDetails.email === this.state.userList[i].email) {
                    alert("user has been registered already")
                    flag = 1;

                }
            }
            if (i === this.state.userList.length && flag !== 1) {
                axios.post("http://localhost:3001/users", userDetails).then((data) => {
                    console.log("new",data)
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
                    <div className="row">
                        <h1>Sign Up</h1>
                        <hr></hr>
                        <div className="col">
                            <label><b>Email</b></label>
                            <input
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                onChange={this.handleChange}
                                required
                            />
                            <p style={{ fontSize: "12", color: 'red' }}>{this.state.emailError}</p>

                            <label><b>Username</b></label>
                            <input
                                type="text"
                                placeholder="Enter username"
                                name="username"
                                onChange={this.handleChange}
                                required
                            />
                            <p style={{ fontSize: "12", color: 'red' }}>{this.state.usernameError}</p>

                            <label><b>Contact No</b></label>
                            <input
                                type="text"
                                placeholder="Enter phone number"
                                name="contact"
                                onChange={this.handleChange}
                                required
                            />
                            <p style={{ fontSize: "12", color: 'red' }}>{this.state.contactError}</p>
                        </div>

                        <div className="col">
                            <label><b>Password</b></label>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                name="password"
                                onChange={this.handleChange}
                                required
                            />
                            <p style={{ fontSize: "12", color: 'red' }}>{this.state.passwordError}</p>

                            <label><b>Repeat Password</b></label>
                            <input
                                type="password"
                                placeholder="Repeat Password"
                                name="pswrepeat"
                                onChange={this.handleChange}
                                required
                            />
                            <p style={{ fontSize: "12", color: 'red' }}>{this.state.pswrepeatError}</p>
                        </div>
                    </div>
                    <div className="clearfix">
                        <button type="submit" onClick={this.handleSubmit} className="signupbtn">REGISTER</button>
                        <br>
                        </br>
                        <div className="link">
                            <Link to="/login">Existing  User? Login</Link>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

}

export default SignUp;