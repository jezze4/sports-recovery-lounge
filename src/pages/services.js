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
    normatec: {
      image: iHypervolt,
      title: <span id="normatec-title">NORMATEC</span>,
      details: <span>
                This is text regarding information about the hypervolt.
                This is text regarding information about the hypervolt.
                This is text regarding information about the hypervolt.
              </span>
    },
    hypervolt: {
      image: iHypervolt,
      title: "Hypervolt",
      details:  <span>
                  This is text regarding information about the hypervolt.
                  This is text regarding information about the hypervolt.
                  This is text regarding information about the hypervolt.
                </span>},
    vyper: {
      image: iVyper,
      title: "Vyper 2.0",
      details:  <span>
                  This is text regarding information about the hypervolt.
                  This is text regarding information about the hypervolt.
                  This is text regarding information about the hypervolt.
                </span>},
    myostorm: {
      image: iMyostorm,
      title: "Myostorm Meteor",
      details:  <span>
                  This is text regarding information about the hypervolt.
                  This is text regarding information about the hypervolt.
                  This is text regarding information about the hypervolt.
                </span>},
    roller: {
      image: iR8roller,
      title: "R8 Roller",
      details:  <span>
                  This is text regarding information about the hypervolt.
                  This is text regarding information about the hypervolt.
                  This is text regarding information about the hypervolt.
                </span>},
  }

  renderCompression(){
    return(
      <Grid container className="services-section" id="massages" >
        <Grid item sm={12}>
          <Typography variant="h3" className="services-title">Compression Therapy</Typography>
          <div className="underbar"></div>
        </Grid>
        {this.renderService(this.serviceDetails['normatec'])}
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

        <Grid item container direction="row" justify="space-between" alignItems="stretch">
          {this.renderService(this.serviceDetails['hypervolt'])}
          {this.renderService(this.serviceDetails["vyper"])}
        </Grid>

        <Grid item container direction="row" justify="space-between" alignItems="stretch">
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

  pricingData = {
    single : {
      min20 : {
        title: "20 minutes",
        price: 20
      },
      min30 : {
        title: "30 minutes",
        price: 25
      },
      min60 : {
        title: "60 minutes",
        price: 35
      },
      fullBody : {
        title: "Full Body 60 minutes",
        price: 45,
        note: "*By appointment only"
      },
    },

    massage : {
      min10 : {
        title: "10 minutes",
        price: 5
      },
      min30 : {
        title: "30 minutes",
        price: 10
      },
      min60 : {
        title: "60 minutes",
        price: 15
      }
    },

    session30 : {
      x3 : {
        title: "3 Times",
        price: 60
      },
      x5 : {
        title: "5 Times",
        price: 75
      },
      x10 : {
        title: "10 Times",
        price: 125
      },
      monthPass : {
        title: "Monthly Pass",
        price: 175
      }
    },

    session60 : {
      x3 : {
        title: "3 Times",
        price: 80
      },
      x5 : {
        title: "5 Times",
        price: 105
      },
      x10 : {
        title: "10 Times",
        price: 175
      },
      monthPass : {
        title: "Monthly Pass",
        price: 225
      }
    },
  }

  renderPricing(){
    return(
      <Grid container direction="column" id="pricing-container">
        <Typography variant="h3" className="pricing-title">Pricing</Typography>
        <div className="underbar" />
      </Grid>
    );
  }

  render(){
    return(
      <div>
        <Grid container direction="column" id="services-container" >
          {this.renderCompression()}
          {this.renderMassage()}
        </Grid>
          {this.renderPricing()}
      </div>
    );
  }
}
