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
      <Grid id="time-container" item container direction="row" justify="space-between">
        <Grid item sm={4} xs={12}>
          <MyScheduler
            date={this.state.date}
            onSelectTime={this.handleDateChange}
            duration={this.state.sessionDur}
          />
        </Grid>
        <Grid container item sm={7} direction="column" justify="space-between" id="appointment-summary">
            <Grid item>
              <Typography variant="h4">Summary<div className="underbar"></div></Typography>
            </Grid>
            <Grid container item sm={7} direction="column" justify="space-around" style={{minWidth: '100%'}}>
              <Grid item>
                <Typography variant="h5">Date: {this.formatDay()} </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h5">Time: {this.formatTime()} </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h5">Type: {this.state.sessionType.toUpperCase()}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h5">Duration: {this.state.sessionDur} Minutes</Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Button variant="contained" classes={{root: 'submit-app-btn'}}>Submit</Button>
            </Grid>
        </Grid>
      </Grid>
    );
  }

  formatDay(){
    const months=["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
    var day = this.state.date.getDate();
    var month = months[this.state.date.getMonth()];
    return month + ' ' + day + ', ' + (this.state.date.getYear()+1900);

  }

  formatTime(){
    var hours = this.state.date.getHours();
    const suffix = (hours>11) ? 'PM' : 'AM';
    hours = (hours > 12) ? hours-12 : hours;
    var min = this.state.date.getMinutes();
    min = (min===0) ? '00' : min;
    return hours + ':' + min + ' ' + suffix;
  }

  /* Legs, Arms, Hips, Full-Body */
  renderSessionSelect(){
    return(
      <Grid container direction="row" id="sessionSelect-container">
        <Grid item sm={12}>
          <Typography variant="h5" className="app-section-title">Session Type</Typography>
        </Grid>
        <Grid item sm={3}>
          {this.addSelection("session", "Legs", "legs")}
        </Grid>
        <Grid item sm={3}>
          {this.addSelection("session", "Arms", "arms")}
        </Grid>
        <Grid item sm={3}>
          {this.addSelection("session", "Hips", "hips")}
        </Grid>
        <Grid item sm={3}>
          {this.addSelection("session", "Full-Body", "body")}
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
          {this.addSelection("duration", "20 Minutes", "20")}
        </Grid>
        <Grid item sm={4}>
          {this.addSelection("duration", "30 Minutes", "30")}
        </Grid>
        <Grid item sm={4}>
          {this.addSelection("duration", "60 Minutes", "60")}
        </Grid>
      </Grid>
    );
  }

  addSelection(classType, title, activeID){
    return(
      <Button
        classes={
          {root:((activeID===this.state.sessionType || activeID===this.state.sessionDur) ? 'selection-active ' : ' ')
           + 'selection-'+ classType
          }}
        onClick={()=>this.onChangeSelection(classType, activeID)}
        >
        <Typography className="selection-button-title">{title}</Typography>
        {/* <Typography className="selection-button-desc">{description}</Typography> */}
      </Button>
    );
  }

  onChangeSelection(classType, activeID){
    if(classType==='session'){
      this.setState({sessionType: activeID});
    } else{
      this.setState({sessionDur: activeID});
    }
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
