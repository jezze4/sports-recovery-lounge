import React, {PureComponent} from 'react';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import '../css/banner.css'

export default class Banner extends PureComponent {
  render(){
    return(
      <div className="banner-container">
        <img src={this.props.img} id="banner-img" alt="banner"/>
        <Grid container direction="column" justify='center' alignItems="center" id="banner-desc">
          <Grid item>
            <p className="banner-text" id="banner-title">Sports Recovery Lounge</p>
          </Grid>
          <Grid item>
            <p className="banner-text" id="banner-subtitle">Sports Recovery Lounge description text or something</p>
          </Grid>
          <Grid item style={{position: 'absolute', bottom: '60px'}}>
            <Button variant="outlined" size="large" classes={{root: 'banner-bt-root'}}>
              <i className="material-icons md-24" style={{color: 'goldenrod'}}> calendar_today</i>
              Make an Appointment
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}
