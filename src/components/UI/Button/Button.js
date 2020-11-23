import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

const button = (props) => {
  const { styleClasses } = props;
  if (props.disabled) {
    styleClasses.push(' disabled');
  }

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={props.type}
      className={styleClasses}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.name}
    </button>
  );
};

button.propTypes = {
  type: PropTypes.string,
  styleClasses: PropTypes.array,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  name: PropTypes.string,
};

button.defaultProps = {
  type: 'button',
};

export default button;
