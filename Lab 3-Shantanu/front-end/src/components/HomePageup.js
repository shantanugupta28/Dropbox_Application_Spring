import React, {Component} from 'react';
import * as API from '../api/API';

class HomePageup extends Component {

    state = {
        userdata: {
            firstname: '',
            lastname: '',
            username: '',
            password: ''
        },
        isLoggedIn: false,
        message: ''
    };

    handleSubmitup = () => {
        API.doSignup(this.state.userdata)
            .then((status) => {
                if (status === 201) {
                    this.setState({
                        isLoggedIn: true,
                        message: "Registerd successfully..!!"
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

                <div className="row justify-content-md-center">
                    <div className="col-md-3">
                        <form>
                            <div className="form-group">
                                <h1>Signup</h1>
                            </div>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="text"
                                    label="firstname"
                                    placeholder="Firstname"
                                    value={this.state.userdata.firstname}
                                    onChange={(event) => {
                                        this.setState({
                                            userdata: {
                                                ...this.state.userdata,
                                                firstname: event.target.value
                                            }
                                        });
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="text"
                                    label="lastname"
                                    placeholder="Lastname"
                                    value={this.state.userdata.lastname}
                                    onChange={(event) => {
                                        this.setState({
                                            userdata: {
                                                ...this.state.userdata,
                                                lastname: event.target.value
                                            }
                                        });
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="text"
                                    label="username"
                                    placeholder="Enter username"
                                    value={this.state.userdata.username}
                                    onChange={(event) => {
                                        this.setState({
                                            userdata: {
                                                ...this.state.userdata,
                                                username: event.target.value
                                            }
                                        });
                                    }}
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="password"
                                    label="password"
                                    placeholder="Enter Password"
                                    value={this.state.userdata.password}
                                    onChange={(event) => {
                                        this.setState({
                                            userdata: {
                                                ...this.state.userdata,
                                                password: event.target.value
                                            }
                                        });
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    onClick={() => this.handleSubmitup()}>
                                    Signup
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row justify-content-md-center">
                    <div className="col-md-3">
                        {this.state.message && (
                            <div className="alert alert-warning" role="alert">
                                {this.state.message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePageup;