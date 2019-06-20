import React, {PureComponent} from 'react'
import Container from '@material-ui/core/Container'
import Calendar from 'react-calendar'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

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

import '../css/appointments.css'

export default class Appointments extends PureComponent {
  state = {
    date: new Date(),
    session: '20',
    appData: []
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
        alert(JSON.stringify(this.state.appData));
      })
  }

  /* For TimePicker */
  handleDateChange = (date) => {
    date = new Date(date);
    alert(date);
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

  render(){
    return(
      <Container id="appointment-container">
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
      </Container>
    );
  }
}
