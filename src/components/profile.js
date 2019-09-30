import React, {PureComponent} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import SwipeableViews from "react-swipeable-views";
import {withRouter} from 'react-router-dom';

import {auth, providers} from '../components/firebase';


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

class Profile extends PureComponent {

  state={
    index: 0,
    user: null,
  }

  componentDidMount(){
    this.setState({user: this.props.user})
  }

  logout(){
    auth.signOut();
    this.props.history.push("/");
    alert("You have signed out!");
  }


  renderAppointments(data){
    return(
      <Grid container direction="column">
        <Grid className="profile-apt-title-container" container direction="row">
          <Grid item xs={5}><Typography variant="h6" className="profile-apt-title">Start Time</Typography></Grid>
          <Grid item xs={3}><Typography variant="h6" className="profile-apt-title">Duration</Typography></Grid>
          <Grid item xs={4}><Typography variant="h6" className="profile-apt-title">Type</Typography></Grid>
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

  renderSettings(){
    return(
      <div className="profile-settings-container">
        <Typography variant="h6" className="profile-settings-title">Contact Info</Typography>
        <Typography className="profile-settings-text">Phone: 956-337-7531</Typography>
        <Typography className="profile-settings-text">Email: jezze.04@gmail.com</Typography>
        <Typography variant="h6" className="profile-settings-title">Options</Typography>
        <Typography className="profile-settings-text">Cancel Appointments?</Typography>
        <div className="profile-settings-text">
          <Button variant="outlined" color="secondary" onClick={()=>this.logout()}>
            Sign out
          </Button>
        </div>
      </div>
    );

  }

  renderInfo(){
    return(
      <div className="profile-info-container">
        <Typography variant="h4">{this.props.name}</Typography>
        <Typography variant="subtitle1">Scheduled Appointments: 3</Typography>
        <Typography variant="subtitle1">Completed Appointments: 3</Typography>
      </div>
    );
  }

  renderProfile(){
    const { index } = this.state;
    return(
      <Paper className="profile-container">
        {this.renderInfo()}
        <Tabs
          classes={{root: 'profile-tabs-root', indicator: 'profile-tabs-indicator'}}
          variant="fullWidth"
          value={index}
          onChange={(event,index)=>this.setState({index})}
        >
          <Tab disableRipple disableFocusRipple label="Appointments"/>
          <Tab disableRipple disableFocusRipple label="Settings"/>
        </Tabs>
        <div className="profile-swipeable-container">
          <SwipeableViews
            enableMouseEvents
            resistance
            index={index}
            onChangeIndex={(index)=>this.setState({index})}
            >
            <div className="profile-swipeable-view">{this.renderAppointments(testAppts)}</div>
            <div className="profile-swipeable-view">{this.renderSettings()}</div>
          </SwipeableViews>
        </div>

      </Paper>
    );
  }

  render(){
    if(this.props.user){
      return(this.renderProfile());
    } else {
      return(
        <div style={{paddingTop: '10vh', background: 'black', height: '100vh'}}>
          <Typography variant="h3" style={{color: 'goldenrod'}}>Getting Info...</Typography>
        </div>
      );
    }
  }
}

export default withRouter(Profile);
