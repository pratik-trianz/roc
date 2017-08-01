import React, { Component } from 'react';
import { render } from 'react-dom';
// Import routing components
import {Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router';

import Main from './common/main.component.jsx';
import Trade from './common/trade.component.jsx'

render(
    <Router history={hashHistory}>
        <Route component={Main}>
            <Route path="/" component={Trade}/>
            <Route path="/trade" component={Trade}/>
        </Route>
    </Router>,
    document.getElementById('container')
);
