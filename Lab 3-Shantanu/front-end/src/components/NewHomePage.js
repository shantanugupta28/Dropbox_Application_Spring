import React, {Component} from 'react';
import * as API from '../api/API';
import Login from "./Login";
import Message from "./Message";

class NewHomePage extends Component {

    state = {
        isLoggedIn: false,
        message: ''
    };

    handleSubmit = (userdata) => {
        API.doLogin(userdata)
            .then((status) => {
                if (status === 201) {
                    this.setState({
                        isLoggedIn: true,
                        message: "Welcome to my App..!!"
                    });
                } else if (status === 401) {
                    this.setState({
                        isLoggedIn: false,
                        message: "Wrong username or password. Try again..!!"
                    });
                }
            });
    };

    handleSubmitup = (userdata) => {
        API.doSignup(userdata)
            .then((status) => {
                if (status === 201) {
                    this.setState({
                        isLoggedIn: true,
                        message: "Registerd Successfully..!!"
                    });
                } else if (status === 401) {
                    this.setState({
                        isLoggedIn: false,
                        message: " Try again..!!"
                    });
                }
            });
    };
    render() {
        return (
            <div className="container-fluid">
                <Login handleSubmit={this.handleSubmit}/>
                <Signup handleSubmitup={this.handleSubmitup}/>
                <Message message={this.state.message}/>
            </div>
        );
    }
}

export default NewHomePage;