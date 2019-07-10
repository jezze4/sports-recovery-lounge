import React, {PureComponent} from 'react'
import Container from '@material-ui/core/Container'
import Calendar from 'react-calendar'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

import {TimePicker} from '@material-ui/pickers'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'

import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

/* Firebase */
import {srl_db} from '../components/firebase.js';

import MyScheduler from '../components/myScheduler';

import '../css/appointments.css'

export default class Appointment extends PureComponent {
  state = {
    date: new Date(),
    session: '20',
    appData: [],
    sessionType: 'legs',
    sessionDur: '20',
  }

  /* add to Firebase */
  handleSubmit = () => {
    var key = new Date();
    key = key.toDateString() + " - " + key.toLocaleTimeString();
    const date = this.state.date;
    const session = parseInt(this.state.session, 10);

    var session_date = date.toDateString();
    var session_time = date.toLocaleTimeString();

    srl_db.collection("appointments")
    .doc(key)
    .set({
      parseableDate: date.toString(),
      date: session_date,
      start: session_time,
      session: session,
      name: "Jezze"
    })
    .then(function() {
      alert("Appointment Submitted!");
    })
    .catch(function(error) {
      alert("Uhh... Something happened. Blame it on this error: ", error);
    });
  }

  /* get from Firebase */
  getAppointments(){
    srl_db.collection("appointments")
      .get()
      .then(query => {
        const data = query.docs.map(doc => doc.data());
        this.setState({appData: data[0]});
      })
  }

  /* For TimePicker */
  handleDateChange = (date) => {
    date = new Date(date);
    date = this.verifyDate(date);
    this.setState({date: date});
  }

  verifyDate(date){
    if(date.getHours() < 12 || date.getHours() > 16)
      date.setHours(12);
    return date;
  }

  setStartDate(){
    var fullDate = new Date();
    if(fullDate.getHours() < 12){
      fullDate.setHours(12);
    } else if (fullDate.getHours() > 16){
      var day = fullDate.getDay();
      fullDate.setDate(day+1);
    }
    fullDate.setHours(fullDate.getHours()+1);
    fullDate.setMinutes(0);
    fullDate.setSeconds(0);
    this.setState({date: fullDate});
  }

  /* For Radio Group */
  handleSessionChange = (event) => {
    this.setState({session: event.target.value})
  }

  componentDidMount(){
    this.setStartDate();
    this.getAppointments();
  }

  /* Custom Calendar Parts */
  customNav(e){
    return(
      <Typography className="calendar-nav">{e.label}</Typography>
    );
  }

  renderDateSelect(){
    return(
      <Container id="calendar-container">
        <Calendar
          className="calendar-root"
          tileClassName="calendar-tile"
          value={this.state.date}
          onChange={this.handleDateChange}
          navigationLabel={(e)=>this.customNav(e)}
          nextLabel=<div className="calendar-slownav">›</div>
          prevLabel=<div className="calendar-slownav">‹</div>
          minDetail="month"
        />
      </Container>
    );
  }

  renderTimeSelect(){
    return(
      <Grid id="time-container" item container direction="row">
        <Grid item sm={6} xs={12}>
          <MyScheduler
            date={this.state.date}
          />
        </Grid>
        <Grid item sm={6}>
          <Paper id="appointment-summary">
            <Typography variant="h4">Summary</Typography>
            <br />
            <Typography variant="h5">Start time: {this.state.date.toString()}</Typography>
            <br />
            <Typography variant="h5">Type: {this.state.sessionType.toUpperCase()}</Typography>
            <br />
            <Typography variant="h5">Duration: {this.state.sessionDur} Minutes</Typography>
          </Paper>
        </Grid>
      </Grid>
    );
  }

  /* Legs, Arms, Hips, Full-Body */
  renderSessionSelect(){
    return(
      <Grid container direction="row" id="sessionSelect-container">
        <Grid item sm={12}>
          <Typography variant="h5" className="app-section-title">Session Type</Typography>
        </Grid>
        <Grid item sm={3}>
          {this.addSelection("session", "Legs")}
        </Grid>
        <Grid item sm={3}>
          {this.addSelection("session", "Arms")}
        </Grid>
        <Grid item sm={3}>
          {this.addSelection("session", "Hips")}
        </Grid>
        <Grid item sm={3}>
          {this.addSelection("session", "Full-Body")}
        </Grid>
      </Grid>
    );
  }

  /* 20, 30, 60 minute durations */
  renderDurationSelect(){
    return(
      <Grid container direction="row" id="durationSelect-container">
        <Grid item sm={12}>
          <Typography variant="h5" className="app-section-title">Session Duration</Typography>
        </Grid>
        <Grid item sm={4}>
          {this.addSelection("duration", "20 Minutes")}
        </Grid>
        <Grid item sm={4}>
          {this.addSelection("duration", "30 Minutes")}
        </Grid>
        <Grid item sm={4}>
          {this.addSelection("duration", "60 Minutes")}
        </Grid>
      </Grid>
    );
  }

  addSelection(classType, title, description){
    return(
      <Button classes={{root: 'selection-'+classType}}>
        <Typography className="selection-button-title">{title}</Typography>
        <Typography className="selection-button-desc">{description}</Typography>
      </Button>
    );
  }

  render(){
    return(
      <Container id="appointment-container">
        <Typography variant="h2" gutterBottom>Make an Appointment</Typography>
        {this.renderSessionSelect()}
        {this.renderDurationSelect()}
        <Grid container direction="row" alignItems="center" justify="center">
          <Grid item sm={12}>
            <Typography variant="h5" className="app-section-title" gutterBottom>
              Select Date and Start Time
            </Typography>
          </Grid>
          <Grid item sm={6}>
            {this.renderDateSelect()}
          </Grid>
          <Grid item sm={6}>
            {this.renderTimeSelect()}
          </Grid>
        </Grid>
        {/*
        <h1>Make an appointment</h1>
        <Grid container direction="row" justify="center">
          <Grid item xs={12} md={4} className="appoint-col">
            <h2>Choose your date</h2>
            <Calendar
              className="calendar-root"
              value={this.state.date}
              onChange={this.handleDateChange}
            />
          </Grid>
          <Grid item xs={12} md={4} className="appoint-col">
            <h2> Choose your timeslot </h2>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <TimePicker
                showTodayButton
                todayLabel="Now"
                label="Select START time"
                value={this.state.date}
                onChange={this.handleDateChange}
                minutesStep={5}
              />
            </MuiPickersUtilsProvider>
            <h4> Hours of Operation: 12pm-5pm</h4>
          </Grid>
          <Grid item xs={12} md={4} className="appoint-col">
            <h2> Choose your session </h2>
            <FormControl component="fieldset">
              <RadioGroup aria-label="session" name="session" value={this.state.session} onChange={this.handleSessionChange}>
                <FormControlLabel
                  value="20"
                  control={<Radio color="primary" classes={{root: 'radio-root', checked: 'radio-checked'}}/>}
                  label="20-minute session"/>
                <FormControlLabel
                  value="40"
                  control={<Radio color="primary" classes={{root: 'radio-root', checked: 'radio-checked'}}/>}
                  label="40-minute session"/>
                <FormControlLabel
                  value="60"
                  control={<Radio color="primary" classes={{root: 'radio-root', checked: 'radio-checked'}}/>}
                  label="60-minute session"/>
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Button variant="contained" onClick={()=>this.handleSubmit()}>Submit</Button>
        <p>Date Selected: {this.state.date.toString()} </p>
        <p>Session Selected: {this.state.session} </p>
        */}
      </Container>
    );
  }
}
