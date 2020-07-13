import React, { useEffect } from 'react';

import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './containers/Layout/Layout';
import Auth from './containers/Auth/Auth';
import { authCheckState } from './store/actions';

const App = (props) => {
   useEffect(() => {
      props.authCheckState();
   }, []);

   let routes = null;   
   if (!props.isAuthenticated) {
     routes = (
        <Switch>
            <Route path="/" component={Auth} />;
        </Switch>
     );
  }

  else if (props.isAuthenticated) {
      routes = (
         <Switch>
             <Route path="/" component={Layout} />;
         </Switch>
      );
  }

   return routes;
};

const mapStateToProps = (state) => {
   return {
      isAuthenticated: state.auth.token !== null
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      authCheckState: () => dispatch(authCheckState())
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
