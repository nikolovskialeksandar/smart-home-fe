import React from 'react';

import { NavLink } from 'react-router-dom';

import './NavigationItem.css';

const navigationItem = props => (
        <div className={props.navbar2 ? "navigation-item2" : "navigation-item"}>
            <NavLink to={props.link}>{props.children}</NavLink>
        </div>
);

export default navigationItem;