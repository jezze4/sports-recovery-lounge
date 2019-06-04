import React, {PureComponent} from 'react'
import Container from '@material-ui/core/Container'
import Calendar from 'react-calendar'
import Grid from '@material-ui/core/Grid'

import {TimePicker} from '@material-ui/pickers'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'

import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

import '../css/appointments.css'

export default class Appointments extends PureComponent {
  state = {
    date: new Date(),
    session: '20'
  }

  handleDateChange = (date) => {
    this.setState({date: new Date(date)})
  }

  handleSessionChange = (event) => {
    this.setState({session: event.target.value})
  }

  render(){
    return(
      <Container>
        <h1>Make an appointment</h1>
        <Grid container direction="row">
          <Grid item xs={12} md={4} className="appoint-col">
            <h2>Choose your date</h2>
            <Calendar
              className="calendar-root"
              value={this.state.date}
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
      </Container>
    );
  }
}
