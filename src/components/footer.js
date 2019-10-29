import React, {PureComponent} from 'react';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faPhoneAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'


import '../css/footer.css';

export default class Footer extends PureComponent {

  hoursData = [
    {day: "Monday & Tuesday",     time: " 8:00 AM - 7:00 PM"},
    {day: "Wednesday & Thursday",  time: "10:00 AM - 7:00 PM"},
    {day: "Friday",     time: " 8:00 AM - 7:00 PM"},
    {day: "Saturday",   time: " 9:00 AM - 2:00 PM"},
    {day: "Sunday",     time: "CLOSED"},
  ];

  renderHours(){
    return(
      <Grid item sm={4} container direction="column" id="hours-container">
        <Typography variant="h5" className="footer-title" gutterBottom>Hours of Operation</Typography>
        {this.hoursData.map((day) => (
          <Grid key={day.day} item container direction="row">
            <Grid item sm={5}>{day.day}</Grid>
            <Grid item sm={4} style={{textAlign: 'right'}}>{day.time}</Grid>
          </Grid>
          ))}
      </Grid>
    );
  }

  renderSocial(){
    return(
      <Grid item sm={2} container direction="column" id="social-container">
        <Typography variant="h5" className="footer-title" gutterBottom>Follow Us!</Typography>
        <Grid item container direction="row">
          <Grid item sm={6}>
            <a href="https://www.facebook.com/sportsrecoveryloungeldo/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faFacebookSquare} size="3x" className="fa-icon-social" />
            </a>
          </Grid>
          <Grid item sm={6}>
            <a href="https://www.instagram.com/sportsrecoverylounge/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} size="3x" className="fa-icon-social" />
            </a>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  renderContact(){
    return(
      <Grid item container sm={4} direction="row">
        <Grid item sm={6} container direction="column" id="contact-container">
          <Typography variant="h5" className="footer-title" gutterBottom>Call Us!</Typography>
          <Grid item>
            <FontAwesomeIcon icon={faPhoneAlt} size="2x" className="fa-icon" />
            <Typography className="contact-text">+1 (956) 701-0173</Typography>
          </Grid>
        </Grid>
        <Grid item sm={6} container direction="column" id="contact-container">
          <Typography variant="h5" className="footer-title" gutterBottom>Visit Us!</Typography>
          <Grid item>
            <a href="https://goo.gl/maps/odshgapd7ZkJNKyA8"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" className="fa-icon-social" />
            </a>
            <Typography className="contact-text">
              416 SHILOH RD. STE. 2B
              LAREDO, TEXAS 78045
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  render(){
    if(window.location.pathname !== "/schedule"){
      return(
        <Grid container direction="row" justify="space-evenly" id="footer-container">
          {this.renderHours()}
          {this.renderSocial()}
          {this.renderContact()}
        </Grid>
      );
    }
    else{
      return null;
    }
  }
}
