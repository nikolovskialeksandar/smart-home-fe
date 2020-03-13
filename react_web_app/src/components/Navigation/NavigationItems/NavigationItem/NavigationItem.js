import React from 'react';

import './NavigationItem.css';

const navigationItem = (props) => {
    return (
        <div className="navigation-item">
            <p>{props.navItemName}</p>
        </div>
    );
}

export default navigationItem;