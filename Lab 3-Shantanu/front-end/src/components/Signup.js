import React, {Component} from 'react';
import PropTypes from 'prop-types';
import logo from './logo.jpg';

class Signup extends Component {

    static propTypes = {
        handleSubmitup: PropTypes.func.isRequired
    };

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    };

    componentWillMount(){
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        });
    }

    render() {
        return (


            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />

                </header>

                <div className="row justify-content-md-center">

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-9">


                            </div>
                            <div className="col-sm-3">
                                <form>
                                    <div className="form-group">
                                        <div className="text text-danger">
                                            <h2>New user, Register here</h2>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            label="Firstname"
                                            placeholder="Enter firstname"
                                            value={this.state.firstName}
                                            onChange={(event) => {
                                                this.setState({
                                                    firstName: event.target.value
                                                });
                                            }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            label="Lastname"
                                            placeholder="Enter lastname"
                                            value={this.state.lastName}
                                            onChange={(event) => {
                                                this.setState({
                                                    lastName: event.target.value
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
                                            value={this.state.email}
                                            onChange={(event) => {
                                                this.setState({
                                                    email: event.target.value
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
                                        <input type= "checkbox" name= "robot" value= "I am not a robot"/>
                                        <button
                                            className="btn btn-primary"
                                            type="button"
                                            onClick={() => this.props.handleSubmitup(this.state)}>
                                            Signup
                                        </button>



                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>






                </div>
            </div>
        );
    }
}

export default Signup;