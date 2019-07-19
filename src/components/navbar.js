import React, {PureComponent} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";

import Appointments from '../pages/appointments';
import Home from '../pages/home';
import About from '../pages/about';
import Services from '../pages/services';

import Logo from '../imgs/logo.png';
import '../css/navbar.css';

export default class NavBar extends PureComponent {
  state={
    value: 0,
  }

  handleChange = (event, value) =>{
    this.setState({value});
  }

  renderDesktopNav(location){
    return(
      <AppBar position="static" classes={{root: 'appbar-root appbar-desktop'}}>
        <Link to="/">
          <img src={Logo} alt="" id="appbar-logo"/>
        </Link>
        <Tabs
          classes={{root: 'tabs-root', indicator: 'tabs-indicator'}}
          value={location.pathname}
          onChange={this.handleChange}
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
            label="Book Appointment"
            component={Link}
            to="/appointments"
            value="/appointments"
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
    );
  }

  renderMobileNav(location){
    return(
      <AppBar position="static" classes={{root: 'appbar-root appbar-mobile'}}>
        <Tabs
          classes={{root: 'tabs-root', indicator: 'tabs-indicator'}}
          value={location.pathname}
          onChange={this.handleChange}
          >
          <Tab
            classes={{root: 'tab-root tab-mobile', selected: 'tab-selected'}}
            label=
              <div>
                <i className="material-icons md-24" style={{color: 'white'}}>home</i>
                <div>Home</div>
              </div>
            component={Link}
            to="/"
            value="/"
          />
          <Tab
            classes={{root: 'tab-root tab-mobile', selected: 'tab-selected'}}
            label=
              <div>
                <i className="material-icons md-24" style={{color: 'white'}}>today</i>
                <div>Schedule</div>
              </div>
            component={Link}
            to="/appointments"
            value="/appointments"
          />
          <Tab
            classes={{root: 'tab-root tab-mobile', selected: 'tab-selected'}}
            label=
            <div>
              <i className="material-icons md-24" style={{color: 'white'}}>fitness_center</i>
              <div>Services</div>
            </div>
            component={Link}
            to="/services"
            value="/services"
          />
          <Tab
            classes={{root: 'tab-root tab-mobile', selected: 'tab-selected'}}
            label=
            <div>
              <i className="material-icons md-24" style={{color: 'white'}}>people</i>
              <div>About</div>
            </div>
            component={Link}
            to="/about"
            value="/about"
          />
        </Tabs>
      </AppBar>
    );
  }

  render(){
    return(
      <BrowserRouter>
        <Route
          path="/"
          render={({location}) =>(
            <div>

              {this.renderDesktopNav(location)}
              {this.renderMobileNav(location)}

              <Switch>
                <Route path="/appointments" render={() => <Appointments />} />
                <Route path="/services" render={() => <Services />} />
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
