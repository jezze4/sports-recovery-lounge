import React, {PureComponent} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from "react-swipeable-views";
import {withRouter} from 'react-router-dom';

import {srl_db, auth} from '../components/firebase';

import '../css/profile.css';

class Profile extends PureComponent {

  state={
    index: 0,
    appData: [],
    userData: null,
    userEmail: null,
  }

  componentDidMount(){
    this.authListener();
  }

  authListener() {
    auth.onAuthStateChanged((user) => {
      if(user) {
        this.getUserAppointments(user);
        this.getUser(user.uid);
      } else {
        this.setState({userData: null, userEmail: null});
      }
    })
  }

  logout(){
    auth.signOut();
    this.props.history.push("/");
    alert("You have signed out!");
  }

  getUserAppointments(user) {
    if(user){
      // srl_db.collection("Users").doc(user.uid).collection("appointments")
      //   .get()
      //   .then(query => query.docs.map(doc => doc.data()))
      //   .then(docs => {
      //     docs.sort((a, b) =>
      //       new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
      //     this.setState({appData: docs})
      //   })
    srl_db.collection("appointments").where("userID", "==", user.uid).get()
      .then(query => query.docs.map(doc => doc.data()))
      .then(docs => {
        docs.sort((a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
            this.setState({appData: docs})
      })
    }
  }

  getUser(uid){
    srl_db.collection("Users").doc(uid)
      .get()
      .then(doc => {
        if(doc.exists){
          this.setState({userData: doc.data()})
          this.setState({userEmail: doc.data().email})
        }
      });
  }

  Months = ["Jan.", "Feb.", "March", "April", "May", "June",
                  "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec." ]

  formatDate(date){
    date = new Date(date);
    return this.Months[date.getMonth()] + ' ' + date.getDate();
  }

  formatHours = (date) => {
    date = new Date(date);
    let hours = date.toLocaleTimeString();
    hours = hours.substr(0, hours.length-6) + ' ' + hours.substr(hours.length-2);
    return hours;
  }

  renderAppointments(data){
    return(
      <Grid container direction="column">
        <Grid className="profile-apt-title-container" container direction="row">
          <Grid item xs={5}><Typography variant="h6" className="profile-apt-title">Start Time</Typography></Grid>
          <Grid item xs={3}><Typography variant="h6" className="profile-apt-title">Duration</Typography></Grid>
          <Grid item xs={4}><Typography variant="h6" className="profile-apt-title">Type</Typography></Grid>
        </Grid>
        <div className="profile-locked-appointments">
        {data.map((item, i) => (
          <Grid className="profile-apt-info-container"
            container direction="row"
            key={"profile-appt-"+i}
            alignItems="center"
            >
            <Grid className="profile-apt-info" item xs={5}>
              <Typography style={{fontSize: '.8em'}}>{this.formatDate(item.startDate)}</Typography>
              <Typography>{this.formatHours(item.startDate)}</Typography>
            </Grid>
            <Grid item xs={3}><Typography className="profile-apt-info">{item.length} min.</Typography></Grid>
            <Grid item xs={4}><Typography className="profile-apt-info">{item.type}</Typography></Grid>
          </Grid>
        ))}
        </div>
      </Grid>
    );
  }

  renderSettings(){
    return(
      <div className="profile-settings-container">
        <Typography variant="h6" className="profile-settings-title">Contact Info</Typography>
        {/* <Typography className="profile-settings-text">Phone: 956-337-7531</Typography> */}
        <Typography className="profile-settings-text">{this.state.userEmail}</Typography>
        <Typography variant="h6" className="profile-settings-title">Options</Typography>
        <Typography className="profile-settings-text">
          Cancel Appointments? coming soon <br />
          For now, call (956) 701-0173 or email rferdin@sportsrecoverylounge.com
        </Typography>
        <div className="profile-settings-text">
          <Button classes={{root: 'profile-out-btn'}} variant="outlined" color="secondary" onClick={()=>this.logout()}>
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
        <Typography variant="subtitle1" gutterBottom>Scheduled Appointments: {this.state.appData.length}</Typography>
        {/* <Typography variant="subtitle1">Completed Appointments: {this.state.appData.length}</Typography> */}
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
            <div className="profile-swipeable-view">{this.renderAppointments(this.state.appData)}</div>
            <div className="profile-swipeable-view">{this.renderSettings()}</div>
          </SwipeableViews>
        </div>

      </Paper>
    );
  }

  render(){
    if(this.state.userData){
      return(this.renderProfile());
    } else {
      return(
        <div style={{paddingTop: '40vh', background: 'black', height: '100vh'}}>
          <Typography className="loading-in" style={{color: 'goldenrod'}} variant="h3">Welcome to</Typography>
          <Typography className="loading-in" style={{color: 'goldenrod'}} variant="h3">Sport's Recovery</Typography>
        </div>
      );
    }
  }
}

export default withRouter(Profile);
