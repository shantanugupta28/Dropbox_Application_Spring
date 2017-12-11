import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from './logo.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as API from '../api/API';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Modal from 'react-modal';




class Welcome extends Component {



    static propTypes = {
        username: PropTypes.string.isRequired,
        files: PropTypes.array.isRequired,
        starFile: PropTypes.array.isRequired,
        fileName: PropTypes.string.isRequired,
        folderName: PropTypes.string.isRequired


    };

    state = {
        username : '',
        files : [],
        isActive: false,
        starFile: [],
        fileName:'',
        folderName:''
    };

   /* handleFileUpload = (event) => {

        const payload = new FormData();

        payload.append('myfile', event.target.files[0]);

        API.uploadFile(payload)
            .then((status) => {
                if (status === 204) {
                    API.getFiles()
                        .then((data) => {
                            this.setState({
                                files: data
                            });
                        });
                }
            });

    };*/

    constructor() {
        super();
        this.state = {
            files: [],
            isActive:!this.state.isActive,
            starFile: [],
            fileName: ''
        };
    }

    share(){}

email=(fileName) => {

    API.email(fileName)
        .then((status) => {
            if (status === 201) {
                this.setState({
                    isStarred: true,
                    message: "File emailed"
                });
            } else if (status === 401) {
                this.setState({
                    isStarred: false,
                    message: "Try again..!!"
                });
            }
        });

};

    handleAdd=(folderName, username) => {

        API.addFolder(folderName, username)
            .then((status) => {
                if (status === 201) {
                    this.setState({
                        isStarred: true,
                        message: "Folder Added"
                    });
                } else if (status === 401) {
                    this.setState({
                        isStarred: false,
                        message: "Try again..!!"
                    });
                }
            });

    };



    star = (f) => {
        API.star(f)
            .then((status) => {
                if (status === 201) {
                    this.setState({
                        isStarred: true,
                        message: "File Starred"
                    });
                } else if (status === 401) {
                    this.setState({
                        isStarred: false,
                        message: "Try again..!!"
                    });
                }
            });
    };

    componentWillMount(){
        this.setState({
            username : this.props.username,
            files: this.state.files
        });
        Modal.setAppElement('body');
        document.title = `Welcome, ${this.state.username} !!`;
    }

    componentDidMount(){
        document.title = `Welcome, ${this.state.username} !!`;

        API.getFiles()
            .then((data) => {
                console.log(data);
                this.setState({
                    files: data
                });
            });
        API.getStar()
            .then((data) => {
                //console.log(data);
                this.setState({
                    starFile: data
                });
            });
    };




    render(){



        //const files = this.props.files || [];
        return(






            <div className="App-welcome">
                <div class="jumbotron text-center">

                    <Link to="/login">Logout</Link>



                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-2">
                            <div className= "logo-home">
                                <img src={logo} className="App-logo" alt="logo" /></div>
                            <div className="row-down">

                                <h3>Home</h3>
                                <h3>Files</h3>
                                <h3> Paper</h3>
                                <h3> <mark>Starred Files</mark></h3>
                            </div>
                        </div>
                        <div className="col-sm-8">





                                <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">About</button>


                                <div className="modal fade" id="myModal" role="dialog">
                                    <div className="modal-dialog">


                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <button type="button" className="close" data-dismiss="modal">&times;</button>

                                            </div>
                                            <div className="modal-body">






                                                <h1>Edit Profile</h1>

                                                    <div className="row">

                                                        <div className="col-md-3">

                                                        </div>


                                                        <div className="col-md-9 personal-info">
                                                            <div className="alert alert-info alert-dismissable">
                                                                <a className="panel-close close" data-dismiss="alert">×</a>
                                                                <i className="fa fa-coffee"></i>
                                                                This is an <strong>.alert</strong>. Use this to show important messages to the user.
                                                            </div>
                                                            <h3>Personal info</h3>

                                                            <form className="form-horizontal" role="form">
                                                                <div className="form-group">
                                                                    <label className="col-lg-3 control-label">First name:</label>
                                                                    <div className="col-lg-8">
                                                                        <input className="form-control" type="text" value="Shantanu"/>
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="col-lg-3 control-label">Last name:</label>
                                                                    <div className="col-lg-8">
                                                                        <input className="form-control" type="text" value="Gupta"/>
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="col-lg-3 control-label">Company:</label>
                                                                    <div className="col-lg-8">
                                                                        <input className="form-control" type="text" value=""/>
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="col-lg-3 control-label">Email:</label>
                                                                    <div className="col-lg-8">
                                                                        <input className="form-control" type="text" value="shantanu.gupta@sjsu.edu"/>
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="col-lg-3 control-label">Time Zone:</label>
                                                                    <div className="col-lg-8">
                                                                        <div className="ui-select">
                                                                            <select id="user_time_zone" className="form-control">
                                                                                <option value="Hawaii">(GMT-10:00) Hawaii</option>
                                                                                <option value="Alaska">(GMT-09:00) Alaska</option>
                                                                                <option value="Pacific Time (US &amp; Canada)">(GMT-08:00) Pacific Time (US &amp; Canada)</option>
                                                                                <option value="Arizona">(GMT-07:00) Arizona</option>
                                                                                <option value="Mountain Time (US &amp; Canada)">(GMT-07:00) Mountain Time (US &amp; Canada)</option>
                                                                                <option value="Central Time (US &amp; Canada)" selected="selected">(GMT-06:00) Central Time (US &amp; Canada)</option>
                                                                                <option value="Eastern Time (US &amp; Canada)">(GMT-05:00) Eastern Time (US &amp; Canada)</option>
                                                                                <option value="Indiana (East)">(GMT-05:00) Indiana (East)</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="col-md-3 control-label">Username:</label>
                                                                    <div className="col-md-8">
                                                                        <input className="form-control" type="text" value="Shant"/>
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="col-md-3 control-label">Password:</label>
                                                                    <div className="col-md-8">
                                                                        <input className="form-control" type="password" value="ss"/>
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="col-md-3 control-label">Confirm password:</label>
                                                                    <div className="col-md-8">
                                                                        <input className="form-control" type="password" value="ss"/>
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="col-md-3 control-label"></label>
                                                                    <div className="col-md-8">
                                                                        <input type="button" className="btn btn-primary" value="Save Changes"/>
                                                                            <span></span>
                                                                            <input type="reset" className="btn btn-default" value="Cancel"/>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                            </div>

                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                        </div>
                                    </div>

                                </div>


                            <div className="text text-warning">
                                <h3>Home</h3>
                                <div className="form-control">
                                    <td><h4>Starred</h4></td>
                                    <div className="panel-default">

                                    </div>
                                </div>


                                <div>

                                    {this.state.files.map((file,i) =>
                                        <li>

                                            <div className="panel panel-default">
                                                <div className="panel-heading"> {file}  <a onClick={() => this.star(file)}> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                                    <span className="glyphicon glyphicon-asterisk"></span></a>&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;

                                                    <button
                                                        className="btn btn-dropbox"
                                                        type="button"
                                                        onClick={() => this.share(this.state)}>
                                                        Share
                                                    </button>
                                                    &nbsp;&nbsp;
                                                    <a href="#">
                                                        <span className="glyphicon glyphicon-download-alt"></span>
                                                    </a>&nbsp;&nbsp;
                                                    <button className="btn btn-default btn-sm"
                                                            type="button"
                                                    onClick={() => this.email(file)}>
                                                        <span className="glyphicon glyphicon-envelope"></span>
                                                    </button>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <button type="button" className="btn btn-danger btn-sm">
                                                        <span className="glyphicon glyphicon-remove-sign"></span> Remove
                                                    </button>
                                                 </div>


                                            </div>
                                        </li>



                                    )}
                                </div>


                            </div>



                        </div>













                        <div className="col-sm-2">
                            <div className="typo">
                                <Typography
                                    align={'center'}
                                    type="display3">
                                    <h2>upload</h2>
                                </Typography>
                                <TextField
                                    className={'fileupload'}
                                    type="file"
                                    name="myfile"
                                    onChange={this.handleFileUpload}
                                />

                            </div>
                            <form>
                            <div className="form heading">
                                <h4>Create Shared Folder</h4>
                            </div>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="folderName"
                                    label="folderName"
                                    placeholder="folder name"
                                    value={this.state.folderName}
                                    onChange={(event) => {
                                        this.setState({
                                            folderName: event.target.value
                                        });
                                    }}
                                />
                                <input
                                    className="form-control"
                                    type="username"
                                    label="username"
                                    placeholder="username"
                                    value={this.state.username}
                                    onChange={(event) => {
                                        this.setState({
                                            username: event.target.value
                                        });
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    onClick={() => this.handleAdd(this.state.folderName, this.state.username)}>
                                    Add folder
                                </button>


                            </div>
                        </form>







                            <div className="form-group">
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    >
                                   Need More Space..?
                                </button>

                        </div>
                    </div>
                </div>
            </div>
            </div>








        )
    }
}

export default withRouter(Welcome);