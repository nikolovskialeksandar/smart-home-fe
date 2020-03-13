import React from 'react';

import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => {
    return (
        <div className="navigation-items">
            <NavigationItem navItemName="Dashboard"/>
            <NavigationItem navItemName="Login"/>  
        </div>
    );
}

export default navigationItems;