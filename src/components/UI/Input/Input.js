import React from 'react';

import './Input.css';

const input = (props) => {
    let inputStyles = ['inputElement'];
    let iconValid = null;
    if (!props.valid && props.touched) {
        inputStyles.push('invalid');
        iconValid= <i className="fa fa-times" aria-hidden="true" style={{color:' #FF5722'}}></i>;
    }

    else if (props.touched && props.valid) {
        iconValid= <i className="fa fa-check" aria-hidden="true" style={{color:' #8BC34A'}}></i>;
    }

    return (
        <div className="input">
            <label className="label">{props.label}</label>
            <input 
                className={inputStyles.join(' ')}
                onChange={props.onChange} 
                value= {props.value}
                {...props.elementConfig} 
            />
            {iconValid}
        </div>
    );
}

export default input;