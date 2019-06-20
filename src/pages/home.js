import React, {PureComponent, Fragment} from 'react';
import Banner from '../components/banner'
import Carousel from '../components/carousel'
import Appointments from './appointments'
import Summary from '../components/summary.js'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';

import '../css/home.css'


export default class Home extends PureComponent {

  renderBenefits(image){
    return(
      <Grid container id="section-benefits" justify="flex-start" alignItems="center"
        style={{
          // backgroundImage:"url(https://drive.google.com/uc?export=view&id=1-KSKvU8P1CveoELHrR1qzc1kt40z8Avt)",
          background: 'linear-gradient(to bottom right, rgba(250,210,0,0), rgba(0,0,0,.5)), url(https://drive.google.com/uc?export=view&id='+image+')',
          height: '100vh',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          color: 'white'

        }}
        >
          <Grid item id="benefits-text">
            <Typography variant="h2">Insert text about benefits here</Typography>
          </Grid>
      </Grid>
    );
  }
/*15jtINmtP7LTGzU-YVnj3u6EOYIX1Pv4P*/
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
        {this.renderBenefits("15jtINmtP7LTGzU-YVnj3u6EOYIX1Pv4P")}

        <Appointments />
      </Fragment>
    );
  }
}
