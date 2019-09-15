import React, {PureComponent} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import '../css/profile.css';

const testAppts = [
  {
    start: "9/19, 12:00 PM",
    duration: "60 min.",
    type: "full body",
  },
  {
    start: "9/19, 2:00 PM",
    duration: "30 min.",
    type: "legs",
  },
  {
    start: "9/19, 4:00 PM",
    duration: "20 min.",
    type: "arms",
  },
]



const basicUser = {
  name: 'Jezze Martinez',
  dob: '10/23/1992',
  totalAppts: '3',
}

export default class Profile extends PureComponent {

  renderAppointments(data){
    return(
      <Grid container direction="column">
        <Grid className="profile-apt-title-container" container direction="row">
          <Grid item xs={5}><Typography className="profile-apt-title">Start Time</Typography></Grid>
          <Grid item xs={3}><Typography className="profile-apt-title">Duration</Typography></Grid>
          <Grid item xs={4}><Typography className="profile-apt-title">Type</Typography></Grid>
        </Grid>
        {data.map((item, i) => (
          <Grid className="profile-apt-info-container" container direction="row" key={"profile-appt-"+i}>
            <Grid className="profile-apt-info" item xs={5}><Typography>{item.start}</Typography></Grid>
            <Grid className="profile-apt-info" item xs={3}><Typography>{item.duration}</Typography></Grid>
            <Grid className="profile-apt-info" item xs={4}><Typography>{item.type}</Typography></Grid>
          </Grid>
        ))}
      </Grid>
    );
  }

  renderInfo(){
    return(
      <div className="profile-info-container">
        <Typography variant="h5">{basicUser.name}</Typography>
        <Typography>Scheduled Appointments: {basicUser.totalAppts}</Typography>
        <Typography>Completed Appointments: {basicUser.totalAppts}</Typography>
      </div>
    );
  }

  render(){
    return(
      <Paper className="profile-container">
        {this.renderInfo()}
        {this.renderAppointments(testAppts)}
      </Paper>
    );
  }
}
