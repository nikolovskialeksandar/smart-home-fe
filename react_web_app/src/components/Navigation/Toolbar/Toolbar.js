import React from 'react';

import './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = () => {
    return (
        <div className="toolbar">
            <header>
                <NavigationItems />
            </header>
        </div>
    );
}

export default toolbar;