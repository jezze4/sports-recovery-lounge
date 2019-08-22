import React, {PureComponent} from 'react'
import Container from '@material-ui/core/Container'
import Calendar from 'react-calendar'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from "react-swipeable-views";


/* Firebase */
import {srl_db} from '../components/firebase.js';

import MyScheduler from '../components/myScheduler';

import '../css/appointments.css'

export default class Appointment extends PureComponent {
  state = {
    date: new Date(),
    appData: {},
    sessionType: 'legs',
    sessionDur: '20',
    sessionPrice: '20',
    dataFetched: false,

    //mobile
    activeStep: 0,
  }

  /* add to Firebase */
  handleSubmit = () => {
    var key = new Date();
    key = key.toDateString() + " - " + key.toLocaleTimeString();
    const date = this.state.date;
    const session_length = parseInt(this.state.sessionDur, 10);
    const session_type = this.state.sessionType;

    var endDate = new Date(date);
    endDate.setMinutes(date.getMinutes()+session_length);

    var session_date = date.toDateString();
    var session_time = date.toLocaleTimeString();

    srl_db.collection("appointments")
    .doc(key)
    .set({
      startDate: date.toISOString(),
      date: session_date,
      endDate: endDate.toISOString(),
      type: session_type,
      start: session_time,
      length: session_length,
      name: "Jezze"
    })
    .then(function() {
      alert("Appointment Submitted!");
    })
    .catch(function(error) {
      alert("Uhh... Something happened. Blame it on this error: ", error);
    });
  }

  /* get from Firebase */
  getAppointments(){
    srl_db.collection("appointments")
      .get()
      .then(query => query.docs.map(doc => doc.data()))
      .then(docs => this.setState({appData: docs}))
      .then(res => this.setState({dataFetched: true}));
  }

  /* For TimePicker */
  handleDateChange = (date) => {
    date = new Date(date);
    this.setState({date: date});
  }

  setStartDate(){
    var fullDate = new Date();
    if(fullDate.getHours() < 12){
      fullDate.setHours(12);
    } else if (fullDate.getHours() > 16){
      var day = fullDate.getDay();
      fullDate.setDate(day+1);
    }
    fullDate.setHours(fullDate.getHours()+1);
    fullDate.setMinutes(0);
    fullDate.setSeconds(0);
    this.setState({date: fullDate});
  }

  componentDidMount(){
    this.setStartDate();
    this.getAppointments();
  }

  /* Custom Calendar Parts */
  customNav(e){
    return(
      <Typography className="calendar-nav">{e.label}</Typography>
    );
  }

  renderDateSelect(){
    return(
      <Container id="calendar-container">
        {(this.mobilecheck())?<Typography className="app-section-title">Date</Typography> : ''}
        <Calendar
          className="calendar-root"
          tileClassName="calendar-tile"
          value={this.state.date}
          onChange={this.handleDateChange}
          navigationLabel={(e)=>this.customNav(e)}
          nextLabel=<div className="calendar-slownav">›</div>
          prevLabel=<div className="calendar-slownav">‹</div>
          minDetail="month"
          minDate={new Date()}
        />
      </Container>
    );
  }

  renderSummary(){
    return(
      <Grid container item xs={12} sm={7} direction="column" justify="space-between" id="appointment-summary">
          <Grid item>
            <Typography variant="h4">Summary<div className="underbar"></div></Typography>
          </Grid>
          <Grid container item xs={8} sm={7} direction="column" justify="space-between" style={{minWidth: '100%'}}>
            <Grid item>
              <Typography variant="h5">Date: {this.formatDay()} </Typography>
              <br />
            </Grid>
            <Grid item>
              <Typography variant="h5">Time: {this.formatTime()} </Typography>
              <br />
            </Grid>
            <Grid item>
              <Typography variant="h5">Type: {this.state.sessionType.toUpperCase()}</Typography>
              <br />
            </Grid>
            <Grid item>
              <Typography variant="h5">Duration: {this.state.sessionDur} Minutes</Typography>
              <br />
            </Grid>
            <Grid item>
              <Typography variant="h5">Estimated Price: ${this.state.sessionPrice}</Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Button variant="contained" classes={{root: 'submit-app-btn'}} onClick={this.handleSubmit}>
              Submit
            </Button>
          </Grid>
      </Grid>
    );
  }

  renderTimeSelect(){
    if(true){
      return(
        <Grid id="time-container" item container direction="row" justify={(!this.mobilecheck())?'space-between':'center'}>
          {(this.mobilecheck())?<Typography className="app-section-title">Time</Typography> : ''}
          <Grid item sm={4} xs={10}>
            <MyScheduler
              date={this.state.date}
              onSelectTime={this.handleDateChange}
              duration={this.state.sessionDur}
              AppData={this.state.appData}
            />
          </Grid>
          {(!this.mobilecheck())?this.renderSummary():''}
        </Grid>
      );
    }
  }

  formatDay(){
    const months=["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
    var day = this.state.date.getDate();
    var month = months[this.state.date.getMonth()];
    return month + ' ' + day + ', ' + (this.state.date.getYear()+1900);

  }

  formatTime(){
    var hours = this.state.date.getHours();
    const suffix = (hours>11) ? 'PM' : 'AM';
    hours = (hours > 12) ? hours-12 : hours;
    var min = this.state.date.getMinutes();
    min = (min===0) ? '00' : min;
    return hours + ':' + min + ' ' + suffix;
  }

  /* Legs, Arms, Hips, Full-Body */
  renderSessionSelect(){
    return(
      <Grid container direction="row" id="sessionSelect-container">
        <Grid item xs={12} sm={12}>
          <Typography variant="h5" className="app-section-title">Session Type</Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          {this.addSelection("session", "Legs", "legs")}
        </Grid>
        <Grid item xs={12} sm={3}>
          {this.addSelection("session", "Arms", "arms")}
        </Grid>
        <Grid item xs={12} sm={3}>
          {this.addSelection("session", "Hips", "hips")}
        </Grid>
        <Grid item xs={12} sm={3}>
          {this.addSelection("session", "Full-Body", "body")}
        </Grid>
      </Grid>
    );
  }

  /* 20, 30, 60 minute durations */
  renderDurationSelect(){
    return(
      <Grid container direction="row" id="durationSelect-container">
        <Grid item xs={12} sm={12}>
          <Typography variant="h5" className="app-section-title">Session Duration</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          {this.addSelection("duration", "20 Minutes", "20")}
        </Grid>
        <Grid item xs={12} sm={4}>
          {this.addSelection("duration", "30 Minutes", "30")}
        </Grid>
        <Grid item xs={12} sm={4}>
          {this.addSelection("duration", "60 Minutes", "60")}
        </Grid>
      </Grid>
    );
  }

  addSelection(classType, title, activeID){
    return(
      <Button
        classes={
          {root:((activeID===this.state.sessionType || activeID===this.state.sessionDur) ? 'selection-active ' : ' ')
           + 'selection-' + classType +
           ((classType==='duration' && activeID!=="60" && this.state.sessionType==="body") ? ' selection-disabled' : '')
          }}
        onClick={()=>this.onChangeSelection(classType, activeID)}
        >
        <Typography className="selection-button-title">{title}</Typography>
      </Button>
    );
  }

  onChangeSelection(classType, activeID){
    if(classType==='session'){
      this.setState({sessionType: activeID});
      if(activeID==='body'){
        this.setState({
          sessionDur: "60",
          sessionPrice: "45"
        });
      }
      else if(this.state.sessionDur==='60'){
        this.setState({sessionPrice: '35'})
      }
    } else{
      this.setState({sessionDur: activeID});
      if(activeID==='20'){
        this.setState({sessionPrice: '20'})
      }
      else if(activeID==='30'){
        this.setState({sessionPrice: '25'})
      }
      else {
        this.setState({sessionPrice: '35'})
      }
    }
  }

  /* Mobile Functions */

  renderScheduler(){
    const { activeStep } = this.state;
    return(
      <SwipeableViews
        index={activeStep}
        onChangeIndex={(i)=>this.handleChangeIndex(i)}
      >
        {this.renderSessionSelect()}
        {this.renderDurationSelect()}
        {this.renderDateSelect()}
        {this.renderTimeSelect()}
        {this.renderSummary()}

      </SwipeableViews>
    );
  }

  handleChangeIndex(index){
    this.setState({activeStep: index});
  }

  renderStepper = () => {
    return(
      <MobileStepper
      variant="dots"
      steps={5}
      position="bottom"
      activeStep={this.state.activeStep}
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
          onClick={()=>this.stepperNext(this.state.activeStep+1)}
          disabled={this.state.activeStep === 4}>
          <Typography className="mobile-stepper-text">Next</Typography>
          <KeyboardArrowRight />
        </Button>
      }
      backButton={
        <Button
          size="small"
          classes={{root: 'mobile-stepper-button'}}
          onClick={()=>this.stepperBack(this.state.activeStep-1)}
          disabled={this.state.activeStep === 0}>
          <KeyboardArrowLeft />
          <Typography className="mobile-stepper-text">Back</Typography>
        </Button>
      }
    />
    );
  }

  stepperNext = (activeStep) => {
    this.setState({activeStep});
  }

  stepperBack = (activeStep) => {
    this.setState({activeStep});
  }

  render(){
    if(!this.mobilecheck()){
      return(
        <Container id="appointment-container">
          {this.renderSessionSelect()}
          {this.renderDurationSelect()}
          <Grid container direction="row" alignItems="center" justify="center">
            <Grid item sm={12}>
              <Typography variant="h5" className="app-section-title" gutterBottom>
                Select Date and Start Time
              </Typography>
            </Grid>
            <Grid item sm={6}>
              {this.renderDateSelect()}
            </Grid>
            <Grid item sm={6}>
              {this.renderTimeSelect()}
            </Grid>
          </Grid>
        </Container>
      );
    }
    else {
      return(
        <Container id="appointment-container-mobile">
          {this.renderScheduler()}
          {this.renderStepper()}
        </Container>
      );
    }
  }

  mobilecheck = ()=> {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    console.log("check: " +check);
    return check;
  };
}
