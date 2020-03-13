import React from 'react';

import './Button.css';

const button = (props) => {
    return (
        <div className="button">
            <p>Light <i class="far fa-lightbulb"></i></p>
            <button 
                type="button"
                onClick={props.sonoffSwitch} 
                style= {props.sonoffState ? {'backgroundColor': '#388E3C'} : {'backgroundColor':'#DD2C00' }}
            > 
                {props.sonoffState ? "ON" : "OFF"}
            </button>
        </div>
    );
}

export default button;