import React, {PureComponent, Fragment} from 'react';
import Banner from '../components/banner'
import Carousel from '../components/carousel'
import Appointments from './appointments'
import Summary from '../components/summary.js'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';

import '../css/home.css'
import AboutImage from '../imgs/runner-girl.jpg';
import BenefitsImage from '../imgs/benefits-girl.jpg'


export default class Home extends PureComponent {

  renderBenefits(){
    return(
      <Grid container id="section-benefits" justify="flex-start" alignItems="center"
        style={{
          // backgroundImage:"url(https://drive.google.com/uc?export=view&id=1-KSKvU8P1CveoELHrR1qzc1kt40z8Avt)",
          background: 'linear-gradient(to bottom right, rgba(250,210,0,0), rgba(0,0,0,.5)), url('+BenefitsImage+')',
          minHeight: '100vh',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          color: 'white'

        }}
        >
          <Grid item id="benefits-text">
            <Typography variant="h2" id="benefits-title" className="pricing-title">
              WHO WOULD BENEFIT FROM COMPRESSION THERAPY?
              <div className="underbar"/>
            </Typography>
            <br/><br/>
            <Typography variant="p" className="benefit-bullets">
              <div className="gold-bullet"/>
              Any athlete who uses his/her legs: Runners, Swimmers, Cyclists, Crossfitters, etc.
              <br/>
              <div className="gold-bullet"/>
              Athletes of all sports including football, basketball, baseball, soccer, volleyball, etc.
              <br/>
              <div className="gold-bullet"/>
              Anyone who works on his/her feet all day, because gravity causes poor circulation in your legs
              when you are standing all day. Nurses, doctors, construction, and numerous professions benefit.
              <br/>
              <div className="gold-bullet"/>
              Anyone who battles poor circulation would benefit: diabetes, varicose, peripheral artery disease,
              and just about any circulation disease with the exception of deep vein thrombosis.
              <br/>
              <div className="gold-bullet"/>
              Finally, anyone who enjoys a relaxing massage!
            </Typography>
          </Grid>
      </Grid>
    );
  }

  render(){
    return(
      <div>
        <Carousel />
        <Grid container justify="center" id="summary-container">
          <Grid container item direction="row" id="section-summary" alignItems="stretch" justify="space-evenly">
            <Grid item xs={12} sm={4}>
              <Summary
                title="Want In?"
                img={AboutImage}
                info="Recover like the pros! Set up an appointment and find why this technology is becoming so popular!"
                button="Reserve a Spot"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Summary
                title="Services"
                img={BenefitsImage}
                info="We offer a great variety of equipment to relax those muscles and make you feel amazingly refreshed to continue pushing yourself to be the best version of yourself."
                button="Read More"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Summary
                title="Us"
                img={AboutImage}
                info=<div>
                  Everyone has a story. We are not in this for ourselves, but to augment YOU. We are not noobs at this.
                  <br/>Trust us. We know what we're doing. :)</div>
                button="Read More"
              />
            </Grid>
          </Grid>
        </Grid>
        {this.renderBenefits()}

        <Appointments />
      </div>
    );
  }
}
