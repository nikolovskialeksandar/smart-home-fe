import React from 'react';

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


export default button;