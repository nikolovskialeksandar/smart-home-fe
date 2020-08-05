import React from 'react';

import './Navbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawereToogle from '../SideDrawer/DrawerToogle/DrawerToogle';

const navbar = (props) => (
        <div className={props.navbar2 ? "navbar2" : "navbar"}>
            <header>
                <DrawereToogle />
                <NavigationItems navbar2={props.navbar2 ? true : false} />
            </header>
        </div>
);

export default navbar;