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




  renderSignIn(){
    return(
      <Paper className="signin-container">
        <Grid container direction="column" justify="center" alignItems="stretch" style={{height: '100%'}}>
          <Grid item><Typography variant="h3" className="login-title">Sign In</Typography></Grid>
          <br/>
          <Grid item>
            <TextField
              label=<span className="input-label">Email</span>
              type="email"
              name="email"
              autoComplete="email"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <br/>
          <Grid item>
            <TextField
              label=<span className="input-label">Password</span>
              type="password"
              autoComplete="current-password"
              variant="outlined"
              helperText=<a href="">Forgot Password?</a>
              fullWidth
            />
          </Grid>
          <br/>
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
          <br/>
          <Grid item>
            <TextField
              label=<span className="input-label">Name</span>
              name="name"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <br/>
          <Grid item>
            <TextField
              label=<span className="input-label">Email</span>
              type="email"
              name="email"
              autoComplete="email"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <br/>
          <Grid item>
            <TextField
              label=<span className="input-label">Password</span>
              type="password"
              autoComplete="current-password"
              variant="outlined"
              helperText=<a href="">Forgot Password?</a>
              fullWidth
            />
          </Grid>
          <br/>
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
        {this.renderSignIn()}
        {/* {this.renderSignUp()} */}
      </Paper>
    );
  }
}
