import React, {PureComponent} from 'react';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import GoldIcon from '../components/goldIcon';
import Banner from '../components/banner';
import TempImg from '../imgs/logo.png';

/*images for icons*/
import iHypervolt from '../imgs/icons/icon-hypervolt.jpg';
import iMyostorm from '../imgs/icons/icon-myostormmeteor.jpg';
import iR8roller from '../imgs/icons/icon-r8roller.jpg';
import iVyper from '../imgs/icons/icon-vyper.jpg';

import '../css/services.css';

export default class Services extends PureComponent{


  /* Services */

  serviceDetails={
    hypervolt: {
      image: iHypervolt,
      title: "Hypervolt",
      details:  <Typography>
                  This is text regarding information about the hypervolt.
                  This is text regarding information about the hypervolt.
                  This is text regarding information about the hypervolt.
                </Typography>},
    vyper: {
      image: iVyper,
      title: "Vyper 2.0",
      details:  <Typography>
                  This is text regarding information about the hypervolt.
                  This is text regarding information about the hypervolt.
                  This is text regarding information about the hypervolt.
                </Typography>},
    myostorm: {
      image: iMyostorm,
      title: "Myostorm Meteor",
      details:  <Typography>
                  This is text regarding information about the hypervolt.
                  This is text regarding information about the hypervolt.
                  This is text regarding information about the hypervolt.
                </Typography>},
    roller: {
      image: iR8roller,
      title: "R8 Roller",
      details:  <Typography>
                  This is text regarding information about the hypervolt.
                  This is text regarding information about the hypervolt.
                  This is text regarding information about the hypervolt.
                </Typography>},
  }

  renderCompression(){
    return(
      <Grid container className="services-section" id="massages" >
        <Grid item sm={12}>
          <Typography variant="h3" className="services-title">Compression Therapy</Typography>
          <div className="underbar"></div>
        </Grid>

        <Grid item container direction="row" justify="space-around" alignItems="space-around">
          {this.renderService(this.serviceDetails['hypervolt'])}
          {this.renderService(this.serviceDetails["vyper"])}
        </Grid>

        <Grid item container direction="row" justify="space-around" alignItems="space-around">
          {this.renderService(this.serviceDetails["myostorm"])}
          {this.renderService(this.serviceDetails["roller"])}
        </Grid>
      </Grid>
    );
  }

  renderMassage(){
    return(
      <Grid container className="services-section" id="massages" >
        <Grid item sm={12}>
          <Typography variant="h3" className="services-title">Self-Massage Devices</Typography>
          <div className="underbar"></div>
        </Grid>

        <Grid item container direction="row" justify="space-around" alignItems="space-around">
          {this.renderService(this.serviceDetails['hypervolt'])}
          {this.renderService(this.serviceDetails["vyper"])}
        </Grid>

        <Grid item container direction="row" justify="space-around" alignItems="space-around">
          {this.renderService(this.serviceDetails["myostorm"])}
          {this.renderService(this.serviceDetails["roller"])}
        </Grid>
      </Grid>
    );
  }

  renderService(service){
    return(
      <Grid container item sm={5} container direction="row" className="massage-section" justify="center" alignItems="center">
        <Grid item sm={3}>
          <GoldIcon img={service.image} />
        </Grid>
        <Grid item sm={9} className="massage-text-container">
          <Typography className="device-name" variant="h4">{service.title}<div className="underbar"></div></Typography>
          <Typography className="massage-text">
            {service.details}
          </Typography>
        </Grid>
      </Grid>
    );
  }

  /* Pricing */
  renderPricing(){

  }

  render(){
    return(
      <Grid container direction="column" id="services-container" >
        {this.renderCompression()}
        {this.renderMassage()}
      </Grid>
    );
  }
}
