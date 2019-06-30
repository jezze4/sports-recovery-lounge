import React, {PureComponent} from 'react';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import '../css/footer.css';

export default class Footer extends PureComponent {

  hoursData = [
    {day: "Monday",     time: " 8:00 AM - 7:00 PM"},
    {day: "Tueday",     time: " 8:00 AM - 7:00 PM"},
    {day: "Wednesday",  time: "10:00 AM - 7:00 PM"},
    {day: "Thursday",   time: "10:00 AM - 7:00 PM"},
    {day: "Friday",     time: " 8:00 AM - 7:00 PM"},
    {day: "Saturday",   time: " 9:00 AM - 2:00 PM"},
    {day: "Sunday",     time: "CLOSED"},
  ];

  renderHours(){
    return(
      <Grid item sm={4} container direction="column" id="hours-container">
        <Typography variant="h5" gutterBottom>Hours of Operation</Typography>
        {this.hoursData.map((day) =>
          <Grid item container direction="row">
            <Grid item sm={4}>{day.day}</Grid>
            <Grid item sm={8}>{day.time}</Grid>
          </Grid>
        )}
      </Grid>
    );
  }

  render(){
    return(
      <Grid container direction="row" justify="space-evenly" id="footer-container">
        {/* Hours of Operation */}
        {this.renderHours()}

        {/* Social Links */}
        <Grid item sm={4}></Grid>

        {/* Contact + Location */}
        <Grid item sm={4}></Grid>
      </Grid>
    );
  }
}
