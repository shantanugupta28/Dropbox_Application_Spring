import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from './logo.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as API from '../api/API';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Modal from 'react-modal';




class UserProfile extends Component {



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
        folderName:'',
        firstName: "Shantanu",
        lastName: "Gupta",
        address: "190 Ryland",
        zipcode: 95110,
        education: "Graduate",
        phoneNumber: 6692819117

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





                           < a href="/welcome"> <button type="button" className="btn btn-info btn-lg" >Home</button></a>


                            <div className="form-control">

                                <h2> Edit Profile</h2>


                                <form>

                                    <div className="form-group">
                                        <label className="control-label col-sm-2" for="firstName">First Name:</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" placeholder="firstName" value={this.state.firstName}
                                                   onChange={(event) => {
                                                       this.setState({
                                                           firstName: event.target.value
                                                       });
                                                   }}
                                            />
                                        </div>
                                    </div>
                                <br/><br/><br/>
                                    <div className="form-group">
                                        <label className="control-label col-sm-2" for="lastName">last Name:</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" placeholder="lastName" value={this.state.lastName}
                                                   onChange={(event) => {
                                                       this.setState({
                                                           lastName: event.target.value
                                                       });
                                                   }}
                                            />
                                        </div>
                                    </div>
                                    <br/><br/>
                                    <div className="form-group">
                                        <label className="control-label col-sm-2" for="lastName">Email:</label>
                                        <div className="col-sm-10">
                                            <input type="email" className="form-control" placeholder="email" value={this.state.email}
                                                   onChange={(event) => {
                                                       this.setState({
                                                           email: event.target.value
                                                       });
                                                   }}

                                            />
                                        </div>
                                    </div>
                                    <br/><br/>

                                    <div className="form-group">
                                        <label className="control-label col-sm-2" for="lastName">Address:</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" placeholder="Address" value={this.state.address}
                                                   onChange={(event) => {
                                                       this.setState({
                                                           address: event.target.value
                                                       });
                                                   }}
                                            />

                                        </div>
                                    </div>
                                    <br/><br/>

                                    <div className="form-group">
                                        <label className="control-label col-sm-2" for="lastName">Zipcode:</label>
                                        <div className="col-sm-10">
                                            <input type="number" className="form-control" placeholder="zipcode" defaultValue={this.state.zipcode}
                                                   onChange={(event) => {
                                                       this.setState({
                                                           zipcode: event.target.value
                                                       });
                                                   }}
                                            />
                                        </div>
                                    </div>
                                    <br/><br/>
                                    <div className="form-group">
                                        <label className="control-label col-sm-2" for="lastName">Phone Number:</label>
                                        <div className="col-sm-10">
                                            <input type="number" className="form-control" placeholder="phoneNumber" value={this.state.phoneNumber}/>
                                        </div>
                                    </div>
                                    <br/><br/>
                                    <div className="form-group">
                                        <label className="control-label col-sm-2" for="text">Highest Education:</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" placeholder="Highest Education" value={this.state.education}
                                                   onChange={(event) => {
                                                       this.setState({
                                                           education: event.target.value
                                                       });
                                                   }}
                                            />

                                        </div>
                                    </div>
                                    <br/><br/>
                                    <button
                                        className="btn btn-primary"
                                        type="button"
                                        value="Save Changes"
                                        onClick={() => this.props.userEdit(this.state)}>
                                        Save Changes
                                    </button>
                                    &nbsp;&nbsp;&nbsp;
                                    <a href="/welcome">
                                    <button
                                        className="btn btn-primary"
                                        type="reset"
                                        value="Cancel"
                                        >
                                        Cancel
                                    </button>
                                    </a>

                                </form>












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

export default UserProfile;