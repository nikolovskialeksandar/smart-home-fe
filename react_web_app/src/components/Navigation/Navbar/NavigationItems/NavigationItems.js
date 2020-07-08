import React from 'react';

import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => {
    const content = props.navbar2 ? (        
        <div className="navigation-items2">
            <NavigationItem link="/" navbar2>Today</NavigationItem>
            <NavigationItem link="/month" navbar2>Month</NavigationItem>  
        </div>
    )
    : (
        <div className="navigation-items">
            <NavigationItem link="/">Dashboard</NavigationItem>
            <NavigationItem link="/auth">Login</NavigationItem>  
        </div>
    )
    return content;
}

export default navigationItems;