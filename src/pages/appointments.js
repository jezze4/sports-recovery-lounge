import React, {PureComponent} from 'react'
import Container from '@material-ui/core/Container'
import Calendar from 'react-calendar'
import Grid from '@material-ui/core/Grid'

import '../css/appointments.css'

export default class Appointments extends PureComponent {
  state = {
    date: new Date(),
  }

  render(){
    return(
      <Container>
        <h1>Make an appointment</h1>
        <Grid container direction="row">
          <Grid item xs={12} md={4}>
            <h2> Choose your date </h2>
            <Calendar
              className="calendar-root"
              value={this.state.date}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <h2> Choose your timeslot </h2>
          </Grid>
          <Grid item xs={12} md={4}>
            <h2> Choose your session </h2>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
