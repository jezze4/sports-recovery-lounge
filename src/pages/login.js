import React, {PureComponent} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Logo from '../imgs/logo.png';
import LoginBG from '../imgs/normatec_in_orange.jpg';

import '../css/login.css';

const picQuote = "Insert a short description or something";

export default class Login extends PureComponent{

  state={
    bannerPos: "lb-right"
  }

  moveBanner = () => {
    if(this.state.bannerPos==="lb-right")
      this.setState({bannerPos: 'lb-left'});
    else
    this.setState({bannerPos: 'lb-right'});
  }

  renderBanner(){
    return(
      <Grid container direction="column" justify="center" className={"login-banner " + this.state.bannerPos}>
        <Grid item>
          <Typography variant="h3">Banner Title</Typography>
        </Grid>
        <Grid item style={{margin: '40px 0'}}>
          <Typography variant="h5">
            Banner description text that changes,too
          </Typography>
        </Grid>
        <Grid>
          <Button
            variant="outlined"
            classes={{outlined: 'login-banner-button'}}
            onClick={this.moveBanner}
            >
              Sign Up
          </Button>
        </Grid>
      </Grid>
    );
  }

  renderSignIn(){
    return(
      <Paper className="signin-container">
        <Grid container direction="column" justify="center" alignItems="stretch" style={{height: '100%'}}>
          <Grid item><Typography variant="h3" className="login-title">Sign In</Typography></Grid>
          <Grid item style={{marginBottom: '20px'}}>
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
          <Grid item style={{marginBottom: '20px'}}>
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
      <Paper className="signin-container">
        <Grid container direction="column" justify="center" alignItems="stretch" style={{height: '100%'}}>
          <Grid item><Typography variant="h3" className="login-title">Create Account</Typography></Grid>
          <Grid item style={{marginBottom: '20px'}}>
            <TextField
              label=<span className="input-label">Name</span>
              name="name"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item style={{marginBottom: '20px'}}>
            <TextField
              label=<span className="input-label">Email</span>
              type="email"
              name="email"
              autoComplete="email"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item style={{marginBottom: '20px'}}>
            <TextField
              label=<span className="input-label">Password</span>
              type="password"
              autoComplete="current-password"
              variant="outlined"
              helperText=<a href="">Forgot Password?</a>
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

  render(){
    return(
      <Paper className="login-container">
        {this.renderBanner()}
        {/* {this.renderSignIn()} */}
        {this.renderSignUp()}
      </Paper>
    );
  }
}
