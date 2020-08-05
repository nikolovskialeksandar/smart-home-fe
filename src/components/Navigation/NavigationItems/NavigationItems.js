import React from 'react';

import { connect } from 'react-redux';
import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    let content = null;
    if (props.navbar2) {
        content = (
            <div className="navigation-items2">
                <NavigationItem link="/" navbar2>Today</NavigationItem>
                <NavigationItem link="/month" navbar2>Month</NavigationItem>  
            </div>
        );
    }

    else {
        content = (
            <div className="navigation-items">
                <NavigationItem link="/">Dashboard</NavigationItem>
                <NavigationItem link="/logout">Log out</NavigationItem>  
            </div>
        );
    } 

    return content;
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps, null)(navigationItems);