import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import * as API from '../api/API';
import Login from "./Login";
import Message from "./Message";
import Welcome from "./Welcome";
import Signup from "./Signup";
import UserProfile from "./UserProfile";

class NewerHomePage extends Component {

    state = {
        isLoggedIn: false,
        message: '',
        username: ''
    };

    handleSubmit = (userdata) => {
        API.doLogin(userdata)
            .then((status) => {
                if (status === 200) {
                    this.setState({
                        isLoggedIn: true,
                        message: "Welcome to my App..!!",
                        username: userdata.username
                    });
                    this.props.history.push("/welcome");
                } else if (status === 401) {
                    this.setState({
                        isLoggedIn: false,
                        message: "Wrong username or password. Try again..!!"
                    });
                }
            });
    };

    userEdit = (userdata) => {
        var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(userdata.zipcode);
        var isValidPhone= /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(userdata.phoneNumber);
        var isValidEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(userdata.email);
        if (!isValidZip) {
            alert("Please enter correct Zipcode");
        }
        else if(!isValidEmail)
        {
            alert("Please enter valid email address");
        }
        else if(!isValidPhone)
        {
            alert("Please enter valid Phone Number");
        }
        else {
            API.fetchUser(userdata)
                .then((res) => {
                    if (res.value === 201) {
                        this.setState({
                            userRequested:{
                                firstName:res.firstName,
                                lastName:res.lastName,
                                city: res.city,
                                address: res.address,
                                state: res.state,
                                zipcode: res.zipcode,
                                email: res.email,
                                education: res.education,

                            }
                        });
                        this.props.history.push('/UserProfile');
                    } else if (res.value=== 401) {
                        this.setState({
                            message: 'User already exists! Please try with different details!!',
                            alert: "User already exists"
                        });
                    }
                });
        }
    };

    handleLogout = () => {
        console.log('logout called');
        API.logout()
            .then((status) => {
                if(status === 200){
                    this.setState({
                        isLoggedIn: false
                    });
                    this.props.history.push("/");
                }
            });
    };

    handleSubmitup = (userdata) => {
        API.doSignup(userdata)
            .then((status) => {
                if (status === 200) {
                    this.setState({
                        isRegisterd: true,
                        message: "Successfuly signed up..!!",
                        username: userdata.username
                    });
                    this.props.history.push("/welcome");
                } else if (status === 401) {
                    this.setState({
                        isRegisterd: false,
                        message: " Try again..!!"
                    });
                }
            });
    };



    render() {
        return (






            <div className="App">
                <header className="App-header">

                    <h1> Welcome to Dropbox..!!</h1>
                </header>

                <div className="container-fluid">

                    <Route exact path="/" render={() => (
                        <div>

                            <button className="btn btn-success" onClick={() => {
                                this.props.history.push("/login");
                            }}>
                                Enter
                            </button>
                        </div>

                    )}/>

                    <Route exact path="/UserProfile" render={() => (
                        <div>
                            < UserProfile/>
                        </div>
                    )}/>

                    <Route exact path="/signup" render={() => (
                        <div>
                            <Signup handleSubmitup={this.handleSubmitup}/>
                            <Message message={this.state.message}/>
                        </div>
                    )}/>
                    <Route exact path="/login" render={() => (
                        <div>
                            <Login handleSubmit={this.handleSubmit}/>
                            <Message message={this.state.message}/>
                        </div>
                    )}/>
                    <Route exact path="/welcome" render={() => (
                        <Welcome username={this.state.username}/>
                    )}/>
                </div>
            </div>
        );
    }
}

export default withRouter(NewerHomePage);