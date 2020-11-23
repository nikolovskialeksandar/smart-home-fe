import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

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
        placeholder: 'Your email',
      },
      value: '',
      validationRules: {
        required: true,
        isEmail: true,
      },
      validation: {
        valid: false,
        errorMessage: '',
      },
      touched: false,
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Your password',
      },
      value: '',
      validationRules: {
        required: true,
        minLength: 6,
      },
      validation: {
        valid: false,
        errorMessage: '',
      },
      touched: false,
    },
  });

  // Optional passing credentials with url
  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    if (params.get('email')) {
      setControls({
        ...controls,
        email: {
          ...controls.email,
          value: params.get('email'),
          touched: true,
          validation: { valid: true, errorMessage: '' },
        },
        password: {
          ...controls.password,
          value: params.get('pass'),
          touched: true,
          validation: { valid: true, errorMessage: '' },
        },
      });
    }
  }, []);

  const checkValidity = (elementName) => {
    let isValid = true;
    let errorMessage = '';
    const { value } = controls[elementName];

    if (controls[elementName].validationRules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
      if (!pattern.test(value)) {
        errorMessage = 'Invalid email';
      }
    }

    if (controls[elementName].validationRules.minLength) {
      isValid =
        value.length >= controls[elementName].validationRules.minLength && isValid;
      if (value.length <= controls[elementName].validationRules.minLength) {
        errorMessage = 'Password too short';
      }
    }

    if (controls[elementName].validationRules.required) {
      isValid = value.trim() !== '' && isValid;
      if (value.trim() === '') {
        errorMessage = 'Required field';
      }
    }
    const updatedControls = {
      ...controls,
      [elementName]: {
        ...controls[elementName],
        validation: { valid: isValid, errorMessage },
        touched: true,
      },
    };

    setControls(updatedControls);
  };

  const inputChangeHandler = (event, elementName) => {
    const updatedControls = {
      ...controls,
      [elementName]: {
        ...controls[elementName],
        value: event,
      },
    };

    setControls(updatedControls);
  };

  const onSubmit = (email, password, event) => {
    event.preventDefault();
    props.onAuth(email, password, isSignup);
  };

  const switchAuthModeHandler = (event) => {
    event.preventDefault();
    const currentState = isSignup;
    setIsSignup(!currentState);
  };

  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to="/" />;
  }

  const submitErrorMessages = {
    EMAIL_NOT_FOUND: 'Incorrect email address',
    INVALID_PASSWORD: 'Incorrect password',
    EMAIL_EXISTS: 'An account with this email already exists',
  };

  let submitErrorMessage = null;
  if (props.error) {
    submitErrorMessage = (
      <div className="submit-error-message">
        <p>{submitErrorMessages[props.error.message]}</p>
        <i className="fa fa-exclamation-circle" aria-hidden="true" />
      </div>
    );
  }

  let form = (
    <form className="auth">
      <h2>{isSignup ? 'Sign up' : 'Log in'}</h2>
      <Input
        onChange={(event) => inputChangeHandler(event.target.value, 'email')}
        onBlur={() => checkValidity('email')}
        elementConfig={controls.email.elementConfig}
        value={controls.email.value}
        touched={controls.email.touched}
        validation={controls.email.validation}
        label="Email"
      />
      <Input
        onChange={(event) => inputChangeHandler(event.target.value, 'password')}
        onBlur={() => checkValidity('password')}
        elementConfig={controls.password.elementConfig}
        value={controls.password.value}
        touched={controls.password.touched}
        validation={controls.password.validation}
        label="Password"
      />
      {submitErrorMessage}
      <Button
        type="submit"
        styleClasses={['success']}
        onClick={(event) =>
          onSubmit(controls.email.value, controls.password.value, event)
        }
        disabled={!controls.email.validation.valid || !controls.password.validation.valid}
        name="Submit"
      />
      <div className="auth-mode-button">
        <Button
          type="button"
          styleClasses={['transparent']}
          onClick={(event) => switchAuthModeHandler(event)}
          name={isSignup ? 'Log in' : 'Sign up'}
        />
      </div>
    </form>
  );

  if (props.loading) {
    form = <Spinner />;
  }

  return (
    <React.Fragment>
      {authRedirect}
      {form}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    error: state.auth.error,
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actionCreators.auth(email, password, isSignup)),
  };
};

Auth.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  error: PropTypes.object,
  loading: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
