import React, {PureComponent} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";

import Profile from '../pages/profile';
import Login from '../pages/login';
import Schedule from '../pages/schedule';
import Appointments from '../pages/appointments';
import Home from '../pages/home';
import About from '../pages/about';
import Services from '../pages/services';

import Logo from '../imgs/logo.png';
import '../css/navbar.css';

export default class NavBar extends PureComponent {
  state={
    value: 0,
    isMobile: false,
  }

  handleChange = (event, value) =>{
    this.setState({value});
  }

  renderDesktopNav(location){
    if(location.pathname!=="/schedule")
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
    if(location.pathname!=="/schedule")
    return(
      <AppBar position="static" classes={{root: 'appbar-root appbar-mobile'}}>
        <Tabs
          classes={{root: 'tabs-root', indicator: 'tabs-indicator'}}
          value={location.pathname}
          onChange={this.handleChange}
          >
          <Tab
            classes={{root: 'tab-root tab-mobile', selected: 'tab-selected tab-mobile-selected'}}
            label=
              <div>
                <i className="material-icons md-24" style={{color: 'white'}}>home</i>
                {(location.pathname==="/") ? <div>Home</div> : ''}
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
                {(location.pathname==="/appointments") ? <div>Schedule</div> : ''}
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
              {(location.pathname==="/services") ? <div>Services</div> : ''}
            </div>
            component={Link}
            to="/services"
            value="/services"
          />
          <Tab
            classes={{root: 'tab-root tab-mobile', selected: 'tab-selected tab-mobile-selected'}}
            label=
            <div>
              <i className="material-icons md-24" style={{color: 'white'}}>people</i>
              {(location.pathname==="/about") ? <div>About</div> : ''}
            </div>
            component={Link}
            to="/about"
            value="/about"
          />
          />
          <Tab
            classes={{root: 'tab-root tab-mobile', selected: 'tab-selected tab-mobile-selected'}}
            label=
            <div>
              <i className="material-icons md-24" style={{color: 'white'}}>people</i>
              {(location.pathname==="/login") ? <div>Me</div> : ''}
            </div>
            component={Link}
            to="/login"
            value="/login"
          />
        </Tabs>
      </AppBar>

    );
  }

  renderMobileHeader(){
    return(
      <AppBar position="static" classes={{root: 'mobile-header'}}>
        <Link to="/">
          <img src={Logo} alt="" id="appbar-logo"/>
        </Link>
      </AppBar>
    );
  }

  render(){
    const { isMobile } = this.state;
    return(
      <BrowserRouter>
        <Route
          path="/"
          render={({location}) =>(
            <div>
              {(isMobile) ? this.renderMobileHeader() : ''}
              {(isMobile) ? this.renderMobileNav(location) : this.renderDesktopNav(location)}

              <Switch>
                <Route path="/user" render={() => <Profile />} />
                <Route path="/login" render={() => <Login />} />
                <Route path="/schedule" render={() => <Schedule />} />
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

  componentWillMount(){
    this.setState({isMobile: this.mobilecheck()});
  }

  mobilecheck = ()=> {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };
}
