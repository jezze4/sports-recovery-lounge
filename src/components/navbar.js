import React, {PureComponent} from 'react';
import { withRouter, Switch, Route, Link, BrowserRouter as Router} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Dialog from '@material-ui/core/Dialog';

import Profile from '../components/profile';
import Login from '../components/login';
import MobileNavbar from '../components/mobileNavbar';

import Schedule from '../pages/schedule';
import Appointment from '../pages/appointments';
import Home from '../pages/home';
import About from '../pages/about';
import Services from '../pages/services';
import {srl_db, auth} from '../components/firebase';

import Logo from '../imgs/logo.png';
import '../css/navbar.css';

class NavBar extends PureComponent {

  constructor(props) {
    super(props);
    this.state={
      value: 0,
      isMobile: false,
      user: null,
      fullName: null,
      username: null,
      loginDialog: false,
      prevTab: "/",
    }
  }

  componentWillMount(){
    this.setState({isMobile: this.mobilecheck()});
  }

  componentDidMount(){
    window.onpopstate = this.onBackButtonEvent;
    this.authListener();
  }

  onBackButtonEvent = (e) => {
    if(this.state.loginDialog)
      this.setState({loginDialog: false})
    else if(this.props.location.pathname === "/login"){
      this.setState({loginDialog: true})
    }
  }

  addLoginHistory = () => {
    if(this.state.isMobile){
      if(this.props.location.pathname !== "/login")
        this.setState({prevTab: this.props.location.pathname})
      this.props.history.push("/login");
    }
  }

  removeLoginHistory = () => {
    if(this.state.isMobile){
      if(this.props.location.pathname === "/login"){
        window.history.back();
      }
    }
  }

  handleChange = (event, value) =>{
    this.setState({value});
  }

  handleDialog = () => {
    this.setState({loginDialog : !this.state.loginDialog});
  }

  getUser(){
    srl_db.collection("Users").doc(this.state.user.uid)
      .get()
      .then(doc => {
        if(doc.exists){
          // console.log(doc.data());
          this.setState({fullName: doc.data().name})
          let fullName = doc.data().name.split(' ');
          this.setState({username: fullName[0]});
        }
      });
  }

  authListener() {
    auth.onAuthStateChanged((user) => {
      // console.log("authListener: " + JSON.stringify(user.providerData[0].email));
      if(user) {
        this.setState({user: user});
        if(user.displayName){
          this.setState({fullName: user.displayName});
          let fullName = user.displayName.split(' ');
          this.setState({username: fullName[0]});
        }
        else this.getUser();
      } else {
        this.setState({user: null, username: null, fullName: null});
      }
    })
  }

  renderDesktopNav(location){
    const {username} = this.state;
    if(location.pathname!=="/schedule"){
      var path = location.pathname
      if(location.pathname === "/login") path = this.state.prevTab
      return(
        <AppBar position="static" classes={{root: 'appbar-root appbar-desktop'}}>
          <Link to="/">
            <img src={Logo} alt="" id="appbar-logo"/>
          </Link>
          <Tabs
            classes={{root: 'tabs-root', indicator: 'tabs-indicator'}}
            value={path}
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
            />
            <Tab
              classes={{root: 'tab-root', selected: 'tab-selected'}}
              label={(username)?"Hello, " + username + "!":"Login/Signup"}
              component={(username)?Link:Button}
              onClick={(username)?null:this.handleDialog}
              to={(username)?"/account":null}
              value="/account"
            />
          </Tabs>
        </AppBar>
      );
    }
  }

  renderLogin(isMobile){
    return(
      <Dialog
        classes={{root: ((isMobile)?'mobile-login-dialog':'login-dialog')}}
        open={this.state.loginDialog}
        onEntered={this.addLoginHistory}
        onExit={this.removeLoginHistory}
        onClose={this.handleDialog}
        fullScreen={true}
      >
        {/* <div className="mobile-login-modal"> */}
          <Login close={this.handleDialog}/>
        {/* </div> */}
      </Dialog>
    );
  }

  isAdmin(){
    const admins = ["jezze.04@gmail.com", "rferdin@gmail.com", "rferdin@sportsrecoverylounge.com"]
    if(this.state.user){
      let email = this.state.user.email;
      if(admins.includes(email))
        return true;
    }
    return false;
  }

  render(){
    const { isMobile } = this.state;
    return(
      <Router>
        <Route
          path="/"
          render={({location}) =>(
            <div>
              {this.renderLogin(isMobile)}
              {(isMobile) ?
                <MobileNavbar path={location.pathname} user={this.state.username} handleDialog={this.handleDialog}/>
                : this.renderDesktopNav(location)}

              <Switch>
                <Route path="/account" render={() => <Profile user={this.state.user} name={this.state.fullName}/>} />
                <Route path="/schedule" render={() => {
                  if(this.isAdmin())
                    return <Schedule />
                  else {
                    if(this.state.user){
                      alert("Whoa... you do not go here.")
                      window.history.back()
                    }
                  }
                }} />
                <Route path="/appointments" render={() => <Appointment user={this.state.user} handleDialog={this.handleDialog}/>} />
                <Route path="/services" render={() => <Services />} />
                <Route path="/about" render={() => <About/>} />
                <Route path="/" render={() => <Home/>} />
              </Switch>
            </div>
          )}
        />
      </Router>
    );
  }

  mobilecheck = ()=> {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };
}

export default withRouter(NavBar);
