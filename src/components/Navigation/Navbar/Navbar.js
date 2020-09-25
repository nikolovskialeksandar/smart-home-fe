import React from 'react';
import PropTypes from 'prop-types';

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

navbar.propTypes = {
	clicked: PropTypes.func,
	navbar2: PropTypes.bool,
	show: PropTypes.bool,
	desktopOnly: PropTypes.bool
};

export default navbar;