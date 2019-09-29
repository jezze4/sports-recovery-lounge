import React, {PureComponent} from 'react';
import { Link } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import Login from '../components/login';

import Logo from '../imgs/logo.png';
import '../css/navbar.css';

export default class MobileNavbar extends PureComponent {
  state={
    value: 0,
    loginDialog: true,
  }

  handleChange = (event, value) =>{
    this.setState({value});
  }

  handleDialog = () => {
    this.setState({loginDialog : !this.state.loginDialog});
  }

  renderMobileNav(path){
    if(path!=="/schedule"){
      var value = path;
      if(value==="/user") value = "/login";
      return(
        <AppBar position="static" classes={{root: 'appbar-root appbar-mobile'}}>
          <Tabs
            classes={{root: 'tabs-root', indicator: 'tabs-indicator'}}
            value={value}
            onChange={this.handleChange}
            >
            <Tab
              classes={{root: 'tab-root tab-mobile', selected: 'tab-selected tab-mobile-selected'}}
              label=
                <div>
                  <i className="material-icons md-24" style={{color: 'white'}}>home</i>
                  {(value==="/") ? <div>Home</div> : null}
                </div>
              component={Link}
              to="/"
              value="/"
            />
            <Tab
              classes={{root: 'tab-root tab-mobile', selected: 'tab-selected tab-mobile-selected'}}
              label=
                <div>
                  <i className="material-icons md-24" style={{color: 'white'}}>today</i>
                  {(value==="/appointments") ? <div>Schedule</div> : null}
                </div>
              component={Link}
              to="/appointments"
              value="/appointments"
            />
            <Tab
              classes={{root: 'tab-root tab-mobile', selected: 'tab-selected tab-mobile-selected'}}
              label=
              <div>
                <i className="material-icons md-24" style={{color: 'white'}}>fitness_center</i>
                {(value==="/services") ? <div>Services</div> : null}
              </div>
              component={Link}
              to="/services"
              value="/services"
            />
            <Tab
              classes={{root: 'tab-root tab-mobile', selected: 'tab-selected tab-mobile-selected'}}
              label=
              <div>
                <i className="material-icons md-24" style={{color: 'white'}}>people_alt</i>
                {(value==="/about") ? <div>About</div> : null}
              </div>
              component={Link}
              to="/about"
              value="/about"
            />
            {/* <Tab
              classes={{root: 'tab-root tab-mobile', selected: 'tab-selected tab-mobile-selected'}}
              label=
              <div>
                <i className="material-icons md-24" style={{color: 'white'}}>people</i>
                {(value==="/login" || value==="/user") ? <div>Me</div> : null}
              </div>
              component={Link}
              to="/login"
              value="/login"
            /> */}
          </Tabs>
        </AppBar>
      );
    }
  }

  /* Welcome message only rendered if user is logged in */
  renderMobileAppbar(){
    return(
      <AppBar position="static" classes={{root: 'mobile-header'}}>
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
            <div onClick={(e)=>this.handleDialog()}>
              <i className="material-icons md-36 mobile-login-button"
                style={(this.props.user) ? {color: '#f8cc67'} : {color: 'whitesmoke'}}>
                account_circle
              </i>
            </div>
          </Grid>
        </Grid>
      </AppBar>
    );
  }

  renderLogin(){
    return(
      <Dialog
        classes={{root: 'mobile-login-dialog'}}
        open={this.state.loginDialog}
        onClose={this.handleDialog}
        fullScreen={true}
      >
        {/* <div className="mobile-login-modal"> */}
          <Login close={this.handleDialog}/>
        {/* </div> */}
      </Dialog>
    );
  }

  render(){
    return(
      <div>
        {this.renderLogin()}
        {this.renderMobileAppbar()}
        {this.renderMobileNav(this.props.path)}
      </div>
    );
  }
}
