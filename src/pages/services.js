import React, {PureComponent} from 'react';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import GoldIcon from '../components/goldIcon';
// import TempImg from '../imgs/logo.png';

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
                Normatec's patented compression technology has revolutionized
                athlete recovery. Reduce pain and soreness, rejuvenate muslces,
                boost circulation, and recover faster in between training.
              </span>
    },
    hypervolt: {
      image: iHypervolt,
      title: "Hypervolt",
      details:  <span>
                  State-of-the-art percussion massage device that helps relax
                  sore and stiff muscles to improve mobility.
                </span>},
    vyper: {
      image: iVyper,
      title: "Vyper 2.0",
      details:  <span>
                  Vibrating fitness roller allows you to warm up, activate, and
                  recover faster and more effectively. Optimal self myofascial
                  release tool to increase flexibility, circulation, and reduce
                  soreness. Increase range of motion by up to 40%.
                </span>},
    myostorm: {
      image: iMyostorm,
      title: "Myostorm Meteor",
      details:  <span>
                  New and revolutionary muscular recovery device designed to
                  help relieve muscular pain, improve blood circulation, increase
                  flexibility and muscle pliability, speed up the recovery process,
                  and increase performance.
                </span>},
    roller: {
      image: iR8roller,
      title: "R8 DTM Roller",
      details:  <span>
                  The R8 Deep Tissue Massage Roller is an FDA-registered medical device designed to reduce inflammation,
                  break up muscle adhesions, and stimulate blood circulation.
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
      <Grid container item sm={5} direction="row" className="massage-section" justify="center" alignItems="center">
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
      title: "Single Sessions",
      data: [
        {
          title: "20 minutes", price: 20
        },
        {
          title: "30 minutes", price: 25
        },
        {
          title: "60 minutes", price: 35
        },
        {
          title: "Full Body 60 minutes*", price: 45, note: "* By appointment only"
        }]},

    massage : {
      title: "Self-Massage Devices",
      data:[
        {
          title: "10 minutes", price: 5
        },
        {
          title: "30 minutes", price: 10
        },
        {
          title: "60 minutes", price: 15
        }]},

    session30 : {
      title: "30-Minute Sessions",
      data: [
        {
          title: "3 Times", price: 60
        },
        {
          title: "5 Times", price: 75
        },
        {
          title: "10 Times", price: 125
        },
        {
          title: "Monthly Pass", price: 175
        }]},

    session60 : {
      title: "60-Minute Sessions",
      data: [
        {
          title: "3 Times", price: 80
        },
        {
          title: "5 Times", price: 105
        },
        {
          title: "10 Times", price: 175
        },
        {
          title: "Monthly Pass", price: 225
        }]}
  }

  renderPricing(){
    return(
      <Grid container direction="column" id="pricing-container">
        <Typography variant="h3" className="pricing-title">Pricing</Typography>
        <div className="underbar" />
        <Grid item container direction="row" id="price-section1">
          {this.renderPriceSection(this.pricingData.single)}
        </Grid>
        <Grid item container direction="row" justify="space-evenly" alignItems="center" id="price-section2">
          {this.renderPriceSection(this.pricingData.massage)}
          {this.renderPriceSection(this.pricingData.session30)}
          {this.renderPriceSection(this.pricingData.session60)}
        </Grid>

        <Typography style={{color: 'gray'}}>
          ** Complimentary 15 minutes Self-Massage Device Session with ANY Normatec Single Session purchase
        </Typography>
      </Grid>
    );
  }

  renderPriceSection(data){
    return(
      <Grid item container direction="column" className="pricing-section" sm={4}>
        <Typography className="pricing-section-title" variant="h5" gutterBottom>{data.title}:</Typography>

        {data.data.map((item, i) =>
          <Grid key={data.title+item.title} item container direction="row" justify="flex-start">
            <Grid item sm={6}>
              <Typography>{item.title}: </Typography>
            </Grid>
            <Grid item sm={6}>
              <Typography>${item.price}.00</Typography>
            </Grid>
            <Typography style={{marginLeft: '20px'}}>{item.note}</Typography>
          </Grid>
        )}

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
