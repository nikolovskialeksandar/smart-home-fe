import React from 'react';

import './Button.css';

const button = (props) => {
    let button = null;
    if (props.buttonType === 'switch') {
        button = (
            <div className="button-switch">
                <p>Light <i className="far fa-lightbulb"></i></p>
                <button
                    type="button"
                    onClick={props.sonoffSwitch}
                    style={props.sonoffState ? { 'backgroundColor': '#388E3C' } : { 'backgroundColor': '#DD2C00' }}
                >
                    {props.sonoffState ? "ON" : "OFF"}
                </button>
            </div>
        );
    }

    else if (props.buttonType === 'regular') {
        button = 
        <button 
            className={props.styleClasses} 
            onClick={props.onClick}
        >
            {props.name}
        </button>
    } 

    return button;
};


export default button;