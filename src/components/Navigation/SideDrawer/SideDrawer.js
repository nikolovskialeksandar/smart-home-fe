import React from 'react';

import './SideDrawer.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../Backdrop/Backdrop';
import Button from '../../UI/Button/Button';

const sideDrawer = (props) => {
    let styleClasses = ['side-drawer', 'closed'];
    if (props.show) {
        styleClasses = ['side-drawer', 'open'];
    }

    return (
        <React.Fragment>
            <Backdrop show={props.show} clicked={props.closeSideDrawer} />
            <nav className={styleClasses.join(' ')}>
                <NavigationItems closeSideDrawer={props.closeSideDrawer}/>
                <Button 
                    styleClasses="small" 
                    name="X" 
                    onClick={props.closeSideDrawer}
                />
            </nav>
        </React.Fragment>
    );
}

export default sideDrawer;