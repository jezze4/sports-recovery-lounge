import React, {PureComponent} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Logo from '../imgs/logo.png';
import LoginBG from '../imgs/normatec_in_orange.jpg';

import '../css/login.css';

const picQuote = "Insert a short description or something";

export default class Login extends PureComponent{
  render(){
    return(
      <Grid container style={this.styles.container} alignItems="center" justify="center">
        <Grid item container style={this.styles.loginBox}>
          <Grid item container direction="column" justify="center">
            <Grid item><Typography variant="h5">Train. Recover. Repeat.</Typography></Grid>
          </Grid>
          <Grid className="login-input" item container direction="column" justify="space-between" alignItems="stretch">
            <Grid item><Typography variant="h3">Login</Typography></Grid>
            <Grid item container direction="column">
              <TextField
                label=<span className="input-label">Email</span>
                type="email"
                name="email"
                autoComplete="email"
                helperText="We'll keep it confidential!"
                variant="outlined"
              />
              <br />
              <TextField
                label=<span className="input-label">Password</span>
                type="password"
                autoComplete="current-password"
                variant="outlined"
              />
            </Grid>
            <Grid item container direction="row" alignItems="center" justify="space-around">
              <Button variant="outlined" style={{width: '40%', borderRadius: '20px'}}>Login</Button>
              <Button variant="outlined" style={{width: '40%', borderRadius: '20px'}}>Register</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container style={this.styles.pictureBox}>
          <Typography>{picQuote}</Typography>
        </Grid>
      </Grid>
    );
  }

  /* Styles for Login page */
  styles = {
    container : {
      height: '100vh',
      maxWidth: '100vw',
      zIndex: '999999',
      position: 'absolute',
      background: 'white'
    },

    loginBox : {
      background: 'rgb(35,35,35)',
      height: '100%',
      width: '50%',
      padding: '10% 15%',
      color: 'goldenrod',
    },

    pictureBox : {
      // background: 'linear-gradient(black, rgba(0,0,0,0), rgba(0,0,0,0), rgba(0,0,0,0)), url('+LoginBG+')',
      background: 'url('+LoginBG+')',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      height: '100%',
      width: '50%',
      padding: '20px',
      color: 'white',
      boxShadow: '0 0 5px black inset'
    },
  }
}
