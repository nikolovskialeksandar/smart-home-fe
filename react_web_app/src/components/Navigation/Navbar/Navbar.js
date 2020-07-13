import React from 'react';

import './Navbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';

const navbar = (props) => (
        <div className={props.navbar2 ? "navbar2" : "navbar"}>
            <header>
                <NavigationItems navbar2={props.navbar2 ? true : false} />
            </header>
        </div>
);

export default navbar;