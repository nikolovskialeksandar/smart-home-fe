import axios from 'axios';

import * as actionTypes from './actionTypes';
require('dotenv').config();

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (userId, token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: userId,
        token: token
    };
};

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    };
};

export const authLogOut = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const authCheckState = () => {
    return dispatch => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(authSuccess(userId, token));
        }
        else {
            dispatch(authLogOut());
        }
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

       let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.REACT_APP_API_KEY;
       if (isSignup) {
            url= 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + process.env.REACT_APP_API_KEY;
       }

        axios.post(url, authData)
            .then(response => {
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('token', response.data.idToken);
                dispatch(authSuccess(response.data.localId, response.data.idToken));
            })
            .catch((error) => {
                console.log(error);
                dispatch(authFailed(error.response.data.error));
            });
    };
};