import React, {PureComponent} from 'react';
import Container from '@material-ui/core/Container';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from "react-swipeable-views";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default class MobileAppointments extends PureComponent {

  updateIndex(index){
    this.props.updateIndex(index);
  }

  renderScheduler(){
    const { activeStep } = this.props;
    return(
      <SwipeableViews
        index={activeStep}
        onChangeIndex={(i)=>this.updateIndex(i)}
      >
        {this.props.SessionSelect}
        {this.props.DurationSelect}
        {this.props.DateSelect}
        {this.props.TimeSelect}
        {this.props.Summary}

      </SwipeableViews>
    );
  }

  renderStepper() {
    return(
      <MobileStepper
      variant="dots"
      steps={5}
      position="bottom"
      activeStep={this.props.activeStep}
      classes={{
        root: 'mobile-stepper-root',
        progress: 'mobile-stepper-progress',
        dot: 'mobile-stepper-dot',
        dotActive: 'mobile-stepper-dot-active'
      }}
      nextButton={
        <Button
          size="small"
          classes={{root: 'mobile-stepper-button'}}
          onClick={()=>this.updateIndex(this.props.activeStep+1)}
          disabled={this.props.activeStep === 4}>
          <Typography className="mobile-stepper-text">Next</Typography>
          <KeyboardArrowRight />
        </Button>
      }
      backButton={
        <Button
          size="small"
          classes={{root: 'mobile-stepper-button'}}
          onClick={()=>this.updateIndex(this.props.activeStep-1)}
          disabled={this.props.activeStep === 0}>
          <KeyboardArrowLeft />
          <Typography className="mobile-stepper-text">Back</Typography>
        </Button>
      }
    />
    );
  }

  render(){
    return(
      <Container id="appointment-container-mobile">
        {this.renderScheduler()}
        {this.renderStepper()}
      </Container>
    )
  }
}
