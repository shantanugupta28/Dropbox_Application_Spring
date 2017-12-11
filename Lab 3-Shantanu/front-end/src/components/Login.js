import React, {Component} from 'react';
import PropTypes from 'prop-types';
import logo from './logo.jpg';
import Message from "./Message";
import { Route, withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';


class Login extends Component {

    static propTypes = {
        handleSubmit: PropTypes.func.isRequired
    };

    state = {
        username: '',
        password: ''
    };

    componentWillMount(){
        this.setState({
            username: '',
            password: ''
        });
    }

    render() {
        return (

            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo-login" alt="logo" />

                </header>


                <div className="container-fliud">
                    <div className="row">

                        <div className="col-sm-9">
                            <h1> Put your creative energy to work, with Dropbox</h1>

                        </div>
                        <div className="col-sm-3">

                            <form>
                                <div className="form-group">
                                    <h1>Login</h1>
                                </div>
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        type="text"
                                        label="Username"
                                        placeholder="Enter username"
                                        value={this.state.username}
                                        onChange={(event) => {
                                            this.setState({
                                                username: event.target.value
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
                                        value={this.state.password}
                                        onChange={(event) => {
                                            this.setState({
                                                password: event.target.value
                                            });
                                        }}
                                    />
                                </div>
                                <div className="form-group">
                                    <button
                                        className="btn btn-primary"
                                        type="button"
                                        onClick={() => this.props.handleSubmit(this.state)}>
                                        Signin
                                    </button>
                                </div>
                                <div className="btn btn-default">
                                    <highlight>new user register here !!</highlight>
                                    <div className="btn btn-link">
                                        <Link to="/signup">Signup</Link>
                                    </div>
                                </div>


                            </form>

                            <Route exact path="/" render={() => (
                                <div>
                                    <Message message="New user Signup here !!"/>

                                </div>
                            )}/>
                        </div>

                    </div>
                </div>






                <div className="row justify-content-md-center">
                    <div className="col-md-3">

                    </div>
                </div>
            </div>
        );
    }
}

export default Login;