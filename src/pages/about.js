import React, {PureComponent} from 'react';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import Banner from '../components/banner';

import '../css/about.css';

export default class About extends PureComponent{

  renderDesc(){
    return(
      <Grid container direction="row" justify="center" alignItems="center" id="about-desc">
        <Grid item className="desc-section">
          <Typography variant="h4" gutterBottom className="desc-title">-RECOVER LIKE THE PROS-</Typography>
          <Typography variant="p" className="desc-p">
            Sport's Recovery Lounge is a facility for athletes of all levels and
            sports where they can come and recover faster from any strenuous
            physical activity in our lounge-type setting using mutliple self-
            massage devices and compression therapy with our main focus on
            sessions utilizing the cutting-edge compression therapy of the
            Normatec Recovery System.
          </Typography>
        </Grid>
      </Grid>
    );
  }

  renderRick(){
    return(
      <Grid container id="about-rick" justify="center" alignItems="center">
        <Grid container className="rick-section" direction="row">
          <Grid item xs="12" sm="3" id="pic-container">
            <img
              src="https://drive.google.com/uc?export=view&id=1-Vwb3U22a3G5jmSfjg9dDBm_VbrBv9Aw"
              alt=""
              id="rick-pic"
            />
          </Grid>
          <Grid item xs="12" sm="9" id="rick-text">
            <Typography variant="h4" gutterBottom className="rick-title">-RICARDO FERDIN-</Typography>
            <Typography variant="p" className="rick-p">
              Sport's Recovery Lounge is a facility for athletes of all levels and
              sports where they can come and recover faster from any strenuous
              physical activity in our lounge-type setting using mutliple self-
              massage devices and compression therapy with our main focus on
              sessions utilizing the cutting-edge compression therapy of the
              Normatec Recovery System.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  render(){
    return(
      <div id="about-container">
        <div id="about-banner">
        </div>
        {this.renderDesc()}
        {this.renderRick()}
      </div>
    );
  }
}
