import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import '../css/appbar.css';


export default class NavBar extends PureComponent {
  state={
    value: 0,
  }

  handleChange = (event, value) =>{
    this.setState({value});
  }

  render(){
    return(
      <div>
        <AppBar position="static" classes={{root: 'appbar-root'}}>
          <Tabs
            classes={{root: 'tabs-root', indicator: 'tabs-indicator'}}
            value={this.state.value}
            onChange={this.handleChange}
            variant="fullWidth"
            >
            <Tab classes={{root: 'tab-root'}} label="Home"/>
            <Tab classes={{root: 'tab-root'}} label="Features"/>
            <Tab classes={{root: 'tab-root'}} label="Appointments"/>
            <Tab classes={{root: 'tab-root'}} label="About"/>
          </Tabs>
        </AppBar>

        {this.state.value === 0 && <div>Item One</div>}
        {this.state.value === 1 && <div>Item Two</div>}
        {this.state.value === 2 && <div>Item Three</div>}
        {this.state.value === 3 && <div>Item Four</div>}
      </div>
    );
  }
}
