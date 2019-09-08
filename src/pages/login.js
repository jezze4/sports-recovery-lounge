import React, {PureComponent} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
// import Logo from '../imgs/logo.png';
// import LoginBG from '../imgs/normatec_in_orange.jpg';

import SwipeableViews from "react-swipeable-views";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import '../css/login.css';

// const picQuote = "Insert a short description or something";

export default class Login extends PureComponent{

  state={
    isMobile: true,
    bannerPos: "lb-right",
    signinPos: "signin-left",
    signupPos: "signup-left",
    newUser: false,
    mobileIndex: 0,
  }

  componentWillMount(){
    this.setState({isMobile: this.mobilecheck()});
  }


  /****************************** Desktop Login ******************************/

  moveBanner = () => {
    this.setState({newUser: true})
    if(this.state.bannerPos==="lb-right"){
      this.setState({
        bannerPos: "lb-left",
        signinPos: "signin-right",
        signupPos: "signup-right"
      });
    }
    else{
      this.setState({
        bannerPos: "lb-right",
        signinPos: "signin-left",
        signupPos: "signup-left"
      });
    }
  }

  renderBanner(){
    return(
      <Grid container direction="column" justify="center" alignItems="center"
        className={"login-banner " + this.state.bannerPos}>
        <Grid item>
          <Typography variant="h3">
            {(this.state.bannerPos==='lb-right') ? "First Time?" : "Welcome Back"}
          </Typography>
        </Grid>
        <Grid item style={{margin: '40px 0'}}>
          <Typography variant="h5">
            { (this.state.bannerPos==='lb-right') ?
              "Create an account and get started on a better way to recover." :
              "Enter your information and accesss your account."
            }
          </Typography>
        </Grid>
        <Grid>
          <Button
            variant="outlined"
            classes={{root: 'login-banner-button'}}
            onClick={this.moveBanner}
            >
              {(this.state.bannerPos==='lb-right') ? "Sign Up" : "Sign In"}
          </Button>
        </Grid>
      </Grid>
    );
  }

  renderSignIn(){
    return(
      <Paper className={"signin-container " + this.state.signinPos}>
        <Grid container direction="column" alignItems="stretch" justify="center" style={{height: '100%'}}>
          <Grid item><Typography variant="h3" className="login-title">Sign In</Typography></Grid>
          <Grid item style={{width: '100%', marginBottom: '20px'}}>
            <TextField
              // label=<span className="input-label">Email</span>
              label="Email"
              type="email"
              name="email"
              autoComplete="email"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item style={{width: '100%', marginBottom: '20px'}}>
            <TextField
              // label=<span className="input-label">Password</span>
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              helperText=<a href="">Forgot Password?</a>
              fullWidth
            />
          </Grid>
          <Grid item>
            <Button classes={{root: 'login-button'}}>Sign In</Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }

  renderSignUp(){
    return(
      <Paper className={"signup-container " + this.state.signupPos}>
        <Grid container direction="column" justify="center" alignItems="stretch" style={{height: '100%'}}>
          <Grid item><Typography variant="h3" className="login-title">Create Account</Typography></Grid>
          <Grid item style={{width: '100%', marginBottom: '20px'}}>
            <TextField
              label=<span className="input-label">Name</span>
              name="name"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item style={{width: '100%', marginBottom: '20px'}}>
            <TextField
              label=<span className="input-label">Email</span>
              type="email"
              name="email"
              autoComplete="email"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item style={{width: '100%', marginBottom: '20px'}}>
            <TextField
              label=<span className="input-label">Password</span>
              type="password"
              autoComplete="current-password"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item>
            <Button classes={{root: 'login-button'}}>Sign Up</Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }

  /****************************************************************************/

  /******************************* Mobile Login *******************************/

  handleChangeIndex(index){
    this.setState({mobileIndex:index});
  }

  renderMobileLogin(){
    return(
      <div>
        <SwipeableViews
          enableMouseEvents
          resistance
          index={this.state.mobileIndex}
          onChangeIndex={(i)=>this.handleChangeIndex(i)}
          // springConfig={this.carouselConfig}
          >
            {this.renderMobileSignin()}
            {this.renderMobileSignup()}
          </SwipeableViews>
          <Tabs
            classes={{root: 'm-signin-root', indicator: 'm-signin-indicator'}}
            value={this.state.mobileIndex}
            variant="fullWidth"
            onChange={(event, value)=>this.handleChangeIndex(value)}
          >
            <Tab classes={{root: (this.state.mobileIndex===1)?'m-tab-inactive':''}} label="Sign In" />
            <Tab classes={{root: (this.state.mobileIndex===0)?'m-tab-inactive':''}} label="Create Account" />
          </Tabs>
        </div>
    );
  }

  renderMobileSignin(){
    return(
      <Paper className="mobile-signin-container">
        <Grid container direction="column" alignItems="stretch" justify="center" style={{height: '100%'}}>
          <Grid item><Typography variant="h4" className="login-title">Sign In</Typography></Grid>
          <Grid item style={{width: '100%', marginBottom: '20px'}}>
            <TextField
              // label=<span className="input-label">Email</span>
              label="Email"
              type="email"
              name="email"
              autoComplete="email"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item style={{width: '100%', marginBottom: '20px'}}>
            <TextField
              // label=<span className="input-label">Password</span>
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              helperText=<a href="">Forgot Password?</a>
              fullWidth
            />
          </Grid>
          <Grid item>
            <Button classes={{root: 'login-button'}}>Sign In</Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }

  renderMobileSignup(){
    return(
      <Paper className="mobile-signin-container">
        <Grid container direction="column" justify="center" alignItems="stretch" style={{height: '100%'}}>
          <Grid item><Typography variant="h4" className="login-title">Create Account</Typography></Grid>
          <Grid item style={{width: '100%', marginBottom: '20px'}}>
            <TextField
              label=<span className="input-label">Name</span>
              name="name"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item style={{width: '100%', marginBottom: '20px'}}>
            <TextField
              label=<span className="input-label">Email</span>
              type="email"
              name="email"
              autoComplete="email"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item style={{width: '100%', marginBottom: '20px'}}>
            <TextField
              label=<span className="input-label">Password</span>
              type="password"
              autoComplete="current-password"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item>
            <Button classes={{root: 'login-button'}}>Sign Up</Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }

  /****************************************************************************/

  render(){
    if(!this.state.isMobile){
      return(
        <Paper className="login-container">
          {this.renderBanner()}
          {this.renderSignIn()}
          {(this.state.newUser)?this.renderSignUp():''}
        </Paper>
      );
    }
    else {
      return(
        <Paper className="mobile-login-container">
          {this.renderMobileLogin()}
        </Paper>
      );
    }
  }

  mobilecheck = ()=> {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };
}
