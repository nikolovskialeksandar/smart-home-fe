import React from 'react';
import PropTypes from 'prop-types';

import './Input.css';

const input = (props) => {
  const inputStyles = ['inputElement'];
  if (!props.validation.valid && props.touched) {
    inputStyles.push('invalid');
  }

  return (
    <div className="input">
      <label htmlFor="inputElement" className="label">
        {props.label}
      </label>
      <input
        name="inputElement"
        className={inputStyles.join(' ')}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        {...props.elementConfig}
      />
      <p className="error-message">{props.validation.errorMessage}</p>
    </div>
  );
};

input.propTypes = {
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  elementConfig: PropTypes.object,
  value: PropTypes.string,
  touched: PropTypes.bool,
  validation: PropTypes.object,
  label: PropTypes.string,
};

export default input;
