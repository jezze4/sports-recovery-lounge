import React, {PureComponent} from 'react';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

export default class Submit extends PureComponent {

  render(){
    return(
      <Grid container className="sumbit-container">
        <Typography variant="h3">Almost There!</Typography>
        <Typography variant="h6">Just enter your info...</Typography>
        <TextField
          label="Full Name"
          type="name"
          name="name"
          autoComplete="name"
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Phone"
          type="phone"
          name="phone"
          autoComplete="phone"
          variant="outlined"
          fullWidth
        />
      </Grid>
    );
  }
}
