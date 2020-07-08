import React from 'react';

import './Auth.css'

const auth = () => {
    return (
        <div className="auth">
            <form>
                <input name="user"/>
                <input name="pass"/>
                <button></button>
            </form>
        </div>
    );
}

export default auth;