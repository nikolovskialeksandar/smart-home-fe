import React, { useState } from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './Auth.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionCreators from '../../store/actions/index';

const Auth = (props) => {
    const [isSignup, setIsSignup] = useState(false);
    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your email'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false	
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Your password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    });

    const checkValidity = (value, rules) => {
        let isValid = true;
        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        return isValid;
    };

    const inputChangeHandler = (event, elementName) => {
        let updatedControls = {
            ...controls,
            [elementName] : {
                ...controls[elementName],
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[elementName].validation),
                touched: true 
            }
        };

        setControls(updatedControls);
    };

    const onSubmit = (email, password, isSignup, event) => {
        event.preventDefault();
        props.onAuth(email, password, isSignup);
    };

    const switchAuthModeHandler = (event) => {
        event.preventDefault();
        let currentState = isSignup;
        setIsSignup(!currentState);
    };
    
    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to='/' />;
    }

    let form = (
        <form className="auth">
            <h2>{isSignup? 'Sign up' : 'Log in'}</h2>
            <Input 
                onChange={(event) => inputChangeHandler(event, 'email')}
                elementConfig={controls.email.elementConfig}
                value= {controls.email.value}
                touched= {controls.email.touched}
                valid= {controls.email.valid}
                label="Email"
            />
            <Input 
                onChange={(event) => inputChangeHandler(event, 'password')} 
                elementConfig={controls.password.elementConfig}
                value= {controls.password.value}
                touched= {controls.password.touched}
                valid= {controls.password.valid}
                label="Password"
            />
            <Button 
                onClick={(event) => onSubmit(controls.email.value, controls.password.value, isSignup, event)}
                buttonType="regular"  
                name="Submit" 
                styleClasses="success" 
            />
            <Button 
                onClick={(event) => switchAuthModeHandler(event)} 
                buttonType="regular"
                styleClasses="transparent"
                name={isSignup? 'Log in' : 'Sign up'}
            />
        </form>
    );

    if (props.loading) {
        form = <Spinner />;
    }

    let errorMessage = null;
    if (props.error) {
        errorMessage = props.error.message;
    }

    return (
        <div>
            {authRedirect}
            {errorMessage}
            {form}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
        error: state.auth.error,
        loading: state.auth.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actionCreators.auth(email, password, isSignup))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);