import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";

import Appointments from '../pages/appointments';
import Home from '../pages/home';
import About from '../pages/about';

import Logo from '../imgs/logo.png';
import '../css/navbar.css';

export default class NavBar extends PureComponent {
  state={
    value: 0,
  }

  handleChange = (event, value) =>{
    this.setState({value});
  }

  render(){
    return(
      <BrowserRouter>
        <Route
          path="/"
          render={({location}) =>(
            <div>
              <AppBar position="static" classes={{root: 'appbar-root'}}>
                <Link to="/">
                  <img src={Logo} alt="" id="appbar-logo"/>
                </Link>
                <Tabs
                  classes={{root: 'tabs-root', indicator: 'tabs-indicator'}}
                  value={location.pathname}
                  onChange={this.handleChange}
                  // variant="fullWidth"
                  >
                  <Tab
                    classes={{root: 'tab-root', selected: 'tab-selected'}}
                    label="Home"
                    component={Link}
                    to="/"
                    value="/"
                  />
                  <Tab
                    classes={{root: 'tab-root', selected: 'tab-selected'}}
                    label="Services & Pricing"
                    component={Link}
                    to="/services"
                    value="/services"
                  />
                  <Tab
                    classes={{root: 'tab-root', selected: 'tab-selected'}}
                    label="About"
                    component={Link}
                    to="/about"
                    value="/about"
                  />
                </Tabs>
              </AppBar>

              <Switch>
                <Route path="/pricing" render={() => <Appointments />} />
                <Route path="/about" render={() => <About/>} />
                <Route path="/" render={() => <Home />} />
              </Switch>
            </div>
          )}
        />
      </BrowserRouter>
    );
  }
}
