import React from 'react';

import './Navbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToogle/DrawerToggle';

const navbar = (props) => (
	<nav className={props.navbar2 ? "navbar2" : "navbar"}>
		{props.navbar2 ? null : <DrawerToggle clicked={props.clicked} />}
		<NavigationItems navbar2={props.navbar2 ? true : false} />
	</nav>
);

export default navbar;