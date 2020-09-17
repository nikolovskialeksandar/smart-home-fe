import React from 'react';

import './Input.css';

const input = (props) => {
    let inputStyles = ['inputElement'];
    let iconValid = null;
    if (!props.validation.valid && props.touched) {
        inputStyles.push('invalid');
    }

    return (
        <div className="input">
            <label className="label">{props.label}</label>
            <input 
                className={inputStyles.join(' ')}
				onChange={props.onChange}
				onBlur={props.onBlur}
                value= {props.value}
                {...props.elementConfig} 
            />
			<p className='error-message'>{props.validation.errorMessage}</p>
        </div>
    );
}

export default input;