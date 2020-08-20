import React from 'react';

import './Navbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToogle/DrawerToggle';

const navbar = (props) => (
	props.navbar2 ?
		<nav className="navbar2">
			<NavigationItems navbar2={true} />   
		</nav> :
		<nav className="navbar">
			<DrawerToggle clicked={props.clicked}/>
			<NavigationItems desktopOnly={props.desktopOnly} />
		</nav>
);

export default navbar;