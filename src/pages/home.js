import React, {PureComponent, Fragment} from 'react';
import Banner from '../components/banner'
import Appointments from './appointments'
import Summary from '../components/summary.js'
import Grid from '@material-ui/core/Grid'


export default class Home extends PureComponent {
  render(){
    return(
      <Fragment>
        <Banner
          img="https://drive.google.com/uc?export=view&id=1rv9PipbkqwNU1CnxH1uZfUOQWqL8uyj3"
        />
        <Grid container direction="row" style={{background: 'white', padding:'80px 18px'}}>
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
        <Appointments />
      </Fragment>
    );
  }
}
