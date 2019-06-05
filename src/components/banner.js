import React, {PureComponent} from 'react';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import '../css/banner.css'

export default class Banner extends PureComponent {
  render(){
    return(
      <div className="banner-container">
        <Grid container direction="row" className="banner-container">
          <Grid item xs={12} md={4} style={{height: 'inherit'}}>
            <img src={this.props.img} id="banner-img" alt="banner"/>
          </Grid>
          <Grid container direction="column" justify='space-around' alignItems="center" item xs={12} md={8}>
            <Grid item>
              <p className="banner-text" id="banner-title">Sports Recovery Lounge</p>
            </Grid>
            <Grid item>
              <p className="banner-text" id="banner-subtitle">Sports Recovery Lounge</p>
            </Grid>
            <Grid item>
              <Button variant="outlined" size="large" color="primary">
                Make an Appointment
                <i class="material-icons md-24" style={{color: 'white'}}> calendar_today</i>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
