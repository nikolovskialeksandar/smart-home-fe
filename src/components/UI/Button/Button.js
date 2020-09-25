import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

const button = (props) => {
    let styleClasses = props.styleClasses;
    if(props.disabled) {
        styleClasses.push(' disabled');
    }

    return (
        <button
            className={styleClasses}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.name}
        </button>
    );
};

button.propTypes = {
	styleClasses: PropTypes.array,
	onClick: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	name: PropTypes.string
};

export default button;