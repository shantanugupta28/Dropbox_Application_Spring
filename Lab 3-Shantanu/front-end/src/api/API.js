const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:8080';
const axios = require('axios');

const headers = {
    'Accept': 'application/json'
};

export const doLogin = (payload) =>
    fetch(`${api}/user/login`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const fetchUser = (payload) =>
    fetch(`${api}/user/fetchUser`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const logout = () =>
    fetch(`${api}/user/logout`, {
        method: 'POST',
        headers: {
            ...headers
        },
        credentials:'include'
    }).then(res => {
        return res.status;
        res.data;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const doSignup = (payload) =>
    fetch(`${api}/user/signup`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

/*export const getFiles = () =>
    fetch(`${api}/users/listdir`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify()
    }).then(res => {  if(res.json().length !==0){
//if(res.data.length!==0){
        var array=res.json();
        //array.length=array.length-1;
        console.log(array);
        return array;
    }
    else{
        return null;
    }})
        .catch(error => {
            console.log("This is error.");
            return error;
        });*/

/*export const getFiles = () =>
    fetch(`${api}/listdir`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    }).then(function(res){ return ['k']})

        .catch(error => {
            console.log("error occurred",error);
            return [];
        });*/


export const getFiles = () =>
    axios.get(api + '/user/list', {
        firstName: 'Shantanu',

    })
        .then(function (response) {
            console.log(response.data);
            return response.data;

        })
        .catch(function (error) {
            console.log(error);
        });

export const star = (data) =>
    axios.post(api + '/star', {
        username: 'Shantanu',
        starFile:data

    })
        .then(function (response) {
            console.log(response.data);
            return response.data;

        })
        .catch(function (error) {
            console.log(error);
        });

export const addFolder = (data) =>
    axios.post(api + '/addFolder', {
        username: 'Shantanu',
        folderName: data

    })
        .then(function (response) {
            console.log(response.data);
            return response.data;

        })
        .catch(function (error) {
            console.log(error);
        });

export const email = (data) =>
    axios.post(api + '/email', {
        fileName:data

    })
        .then(function (response) {
            console.log(response.data);
            return response.data;

        })
        .catch(function (error) {
            console.log(error);
        });

export const getStar = (data) =>
    axios.post(api + '/getstar', {
        username: 'Shantanu',

    })
        .then(function (response) {
            console.log(response.data);
            return response.data;

        })
        .catch(function (error) {
            console.log(error);
        });



export const uploadFile = (payload) =>
    fetch(`${api}/users/uploads`, {
        method: 'POST',
        body: payload
    }).then(res => {
        return res.status;
    }).catch(error => {
        console.log("This is error");
        return error;
    });
