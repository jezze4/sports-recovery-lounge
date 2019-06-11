import React, {PureComponent, Fragment} from 'react';
import Banner from '../components/banner'
import Carousel from '../components/carousel'
import Appointments from './appointments'
import Summary from '../components/summary.js'
import Grid from '@material-ui/core/Grid'

import '../css/home.css'


export default class Home extends PureComponent {
  render(){
    return(
      <Fragment>
        <Carousel />
        <Grid container justify="center" style={{background:'rgb(250, 250, 255)'}}>
          <Grid container item direction="row" id="section-summary">
            <Grid item xs={12} sm={4}>
              <Summary />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Summary />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Summary />
            </Grid>
          </Grid>
        </Grid>
        <Grid container justify="center"
          style={{
            backgroundImage:"url(https://drive.google.com/uc?export=view&id=1-KSKvU8P1CveoELHrR1qzc1kt40z8Avt)",
            height: '100%',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover'

          }}
          >
          <Grid container item direction="row" id="section-summary">
            <Grid item xs={12} sm={4}>
              <Summary />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Summary />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Summary />
            </Grid>
          </Grid>
        </Grid>
        <Appointments />
      </Fragment>
    );
  }
}
