import React, {PureComponent} from 'react';
import { Link } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
// import Dialog from '@material-ui/core/Dialog';
// import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

// import Login from '../components/login';

import Logo from '../imgs/logo.png';
import '../css/navbar.css';

export default class MobileNavbar extends PureComponent {
  state={
    value: null,
    prevScrollpos: window.pageYOffset,
    hidden: false
  }

  // Adds an event listener when the component is mount.
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  // Remove the event listener when the component is unmount.
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const { prevScrollpos } = this.state;

    const currentScrollPos = window.pageYOffset;
    const hidden = prevScrollpos < currentScrollPos;

    this.setState({
      prevScrollpos: currentScrollPos,
      hidden
    });
  };

  handleChange = (event, value) =>{
    this.setState({value});
  }

  renderMobileNav(path){
    if(path!=="/schedule"){
      let value = path;
      const { hidden } = this.state;
      return(
        <AppBar position="static"
          classes={{root: 'appbar-root appbar-mobile ' + ((hidden) ? 'appbar-hidden' : null)}}>
          <Tabs
            classes={{root: 'tabs-root', indicator: 'tabs-indicator'}}
            value={value}
            onChange={this.handleChange}
            >
            <Tab
              classes={{root: 'tab-root tab-mobile', selected: 'tab-selected tab-mobile-selected'}}
              label=<div><i className="material-icons md-24">home</i><div>Home</div></div>
              component={Link}
              to="/"
              value="/"
            />
            <Tab
              classes={{root: 'tab-root tab-mobile', selected: 'tab-selected tab-mobile-selected'}}
              label=<div><i className="material-icons md-24">today</i><div>Schedule</div></div>
              component={Link}
              to="/appointments"
              value="/appointments"
            />
            <Tab
              classes={{root: 'tab-root tab-mobile', selected: 'tab-selected tab-mobile-selected'}}
              label=<div><i className="material-icons md-24">fitness_center</i><div>Services</div></div>
              component={Link}
              to="/services"
              value="/services"
            />
            <Tab
              classes={{root: 'tab-root tab-mobile', selected: 'tab-selected tab-mobile-selected'}}
              label=<div><i className="material-icons md-24">people_alt</i><div>About</div></div>
              component={Link}
              to="/about"
              value="/about"
            />
            <Tab
              value="/account"
            />
          </Tabs>
        </AppBar>
      );
    }
  }

  /* Welcome message only rendered if user is logged in */
  renderMobileAppbar(){
    const { hidden } = this.state;
    return(
      <AppBar position="static"
        classes={{root: 'mobile-header ' + ((hidden)?'header-hidden':null)}}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={3}>
            {(this.props.user) ? (
              <div>
                <Typography className="mobile-appbar-welcome">
                  Welcome
                </Typography>
                <Typography variant="h6" className="mobile-appbar-welcome">
                  {this.props.user}!
                </Typography>
              </div>
              ) : null
            }
          </Grid>
          <Grid item xs={6}>
            <Link to="/"><img src={Logo} alt="" id="appbar-logo"/></Link>
          </Grid>
          <Grid item xs={3}>
            {(this.props.user) ? <Link to="/account">{this.getAccountIcon()}</Link>
            : <div onClick={this.props.handleDialog}>{this.getAccountIcon()}</div>}
          </Grid>
        </Grid>
      </AppBar>
    );
  }

  getAccountIcon(){
    return(
      <i className="material-icons md-36 mobile-login-button"
        style={
          (this.props.path==="/account") ? {textShadow: '0 0 10px goldenrod', color: '#f8cc67'} :
          (this.props.user) ? {color: '#f8cc67'} :
          {color: 'whitesmoke'}}>
        account_circle
      </i>
    );
  }

  render(){
    return(
      <div>
        {this.renderMobileAppbar()}
        {this.renderMobileNav(this.props.path)}
      </div>
    );
  }
}
