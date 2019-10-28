import React, {PureComponent} from 'react'
import Container from '@material-ui/core/Container'
import Calendar from 'react-calendar'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import {withRouter} from 'react-router-dom';
import { renderToString } from 'react-dom/server'

import emailjs from 'emailjs-com';

/* Firebase */
import {srl_db} from '../components/firebase';

import MyScheduler from '../components/myScheduler';
import EmailTemplate from '../components/emailTemplate';
import MobileAppointments from '../components/mobileAppointments';

import '../css/appointments.css'

/* Months for EmailJS */
const months = ["Jan.", "Feb.", "March", "April", "May", "June",
                "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."]

class Appointment extends PureComponent {
  state = {
    date: new Date(),
    appData: {},
    sessionType: 'legs',
    sessionDur: '20',
    sessionPrice: '20',
    dataFetched: false,
    activeStep: 0, // for mobile
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

    var appt_start = session_time.substring(0, session_time.length-6);
    appt_start += session_time.substring(session_time.length-3)

    const appt_date = months[date.getMonth()] + ' ' + date.getDate() + ", " + date.getFullYear();

    /* For EmailJS */
    var templateParams = {
      "user_email": this.props.user.email,
      "user_name": this.props.user.displayName.split(' ')[0],
      "appt_date": appt_date,
      "appt_start": appt_start,
      "appt_type": session_type,
      "appt_length": session_length,
    }

    let emailTemplate = new EmailTemplate;
    let toAdmin = emailTemplate.renderAdminConfirmation(templateParams, this.mobilecheck());
    toAdmin = renderToString(toAdmin);

    var admin_template = {
      "user_email": this.props.user.email,
      "email_subject": "New Appointment Alert",
      "email_template": toAdmin,
    }

    /* Check for no logged-in user. for now, return nothing. */
    if(this.props.user === null){
      this.props.handleDialog();
      return;
    }

    emailjs.send("default_service", "global_temp", admin_template, process.env.REACT_APP_EMAILJS_USERID);

    emailjs.send("default_service","user_appt_submit", templateParams, process.env.REACT_APP_EMAILJS_USERID)
    .then((response) => {
       console.log('SUCCESS!', response.status, response.text);
    }, (err) => {
       console.log('FAILED...', err);
    });

    srl_db.collection("appointments").doc(key).set({
      startDate: date.toISOString(),
      date: session_date,
      endDate: endDate.toISOString(),
      type: session_type,
      start: session_time,
      length: session_length,
      user: this.props.user.email,
      username: this.props.user.displayName,
      userID: this.props.user.uid,
    })

    srl_db.collection("Users").doc(this.props.user.uid)
    .collection("appointments").doc(key)
    .set({
      startDate: date.toISOString(),
      date: session_date,
      endDate: endDate.toISOString(),
      type: session_type,
      start: session_time,
      length: session_length,
      user: this.props.user.email,
      username: this.props.user.displayName,
      userID: this.props.user.uid,
    })
    .then(res => {
        alert("Appointment Submitted!");
        this.props.history.push("/account");
      })
    .catch(function(error) {
      alert("Uhh... Something happened. Blame it on this error: ", error);
    });
    /**/
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

    this.setState({
      date: date,
    });

    let nextStep = this.state.activeStep + 1;
    this.setState({activeStep: nextStep});

    return date;
  }

  setStartDate(){
    var fullDate = new Date();

    let hours = fullDate.getHours();
    let weekday = fullDate.getDay();

    /* move to next day if current time is past closing time */
    switch(weekday){
      case 6: {
        if (hours > 13)
          fullDate.setDate(fullDate.getDate()+1);
          // fullDate = this.handleDateChange(fullDate);
        break;
      }
      default: {
        if (hours > 18)
          fullDate.setDate(fullDate.getDate()+1);
          // fullDate = this.handleDateChange(fullDate);
        break;
      }
    }

    /* skip Sunday */
    if(fullDate.getDay()===0){
      fullDate.setDate(fullDate.getDate()+1);
      // fullDate = this.handleDateChange(fullDate);
    }

    fullDate.setMinutes(0);
    fullDate.setSeconds(0);
    this.setState({date: fullDate});
  }

  componentDidMount(){
    this.setStartDate();
    this.getAppointments();
  }

  /* Custom Calendar Parts */
  checkDisabled(props){
    const day = props.date.getDay();
    const today = new Date();
    const hours = today.getHours();

    if(day === 0) return true;
    if(props.date.getDate()===today.getDate() && props.date.getMonth()===today.getMonth()){
      if(day === 6 && hours > 13) return true;
      else if(hours > 18) return true;
    }
    return false;
  }

  renderDateSelect(){
    return(
      <Container id="calendar-container">
        {(this.mobilecheck())?<Typography className="app-section-title">Date</Typography> : null}
        <Calendar
          className="calendar-root"
          tileClassName="calendar-tile"
          value={this.state.date}
          onChange={(e)=>this.handleDateChange(e, "user")}
          navigationLabel={(props)=>{return(
            <Typography className="calendar-nav">{props.label}</Typography>
          )}}
          nextLabel=<div className="calendar-slownav">›</div>
          prevLabel=<div className="calendar-slownav">‹</div>
          minDetail="month"
          minDate={new Date()}
          tileDisabled={(props)=>this.checkDisabled(props)}
        />
      </Container>
    );
  }

  renderTimeSelect(){
    return(
      <Grid id="time-container" item container direction="row" justify={(!this.mobilecheck())?'space-between':'center'}>
        {(this.mobilecheck())?<Typography className="app-section-title">Time</Typography> : ''}
        <Grid item sm={6} xs={10}>
          <MyScheduler
            date={this.state.date}
            onSelectTime={(e)=>this.handleDateChange(e, "user")}
            duration={this.state.sessionDur}
            AppData={this.state.appData}
          />
        </Grid>
        {(!this.mobilecheck())?this.renderSummary():''}
      </Grid>
    );
  }

  renderSummary(){
    return(
      <Grid container item xs={12} sm={5} direction="column" justify="space-evenly" id="appointment-summary">
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
              <Typography variant="h5">Estimated Price: ${this.state.sessionPrice}.00</Typography>
            </Grid>
          </Grid>
          <Button
            fullWidth variant="contained"
            classes={(this.props.user && this.validSubmit()) ? {root: 'submit-app-btn'} : {root: 'submit-app-btn-disabled'}}
            disabled={!this.validSubmit()}
            onClick={this.handleSubmit}>
            Submit
          </Button>
      </Grid>
    );
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
    let nextStep = this.state.activeStep + 1;
    this.setState({activeStep: nextStep})
  }

  /* Mobile Functions */

  handleChangeIndex(index){
    this.setState({activeStep: index});
  }

  render(){
    if(!this.mobilecheck()){
      return(
        <Container id="appointment-container">
          {this.renderSessionSelect()}
          {this.renderDurationSelect()}
          <Grid container direction="row" alignItems="flex-start" justify="center">
            <Grid item sm={12}>
              <Typography variant="h5" className="app-section-title" gutterBottom>
                Select Date and Start Time
              </Typography>
            </Grid>
            <Grid item sm={5}>
              {this.renderDateSelect()}
            </Grid>
            <Grid item sm={7}>
              {this.renderTimeSelect()}
            </Grid>
          </Grid>
        </Container>
      );
    }
    else {
      return(
        <MobileAppointments
          activeStep = {this.state.activeStep}
          SessionSelect = {this.renderSessionSelect()}
          DurationSelect = {this.renderDurationSelect()}
          DateSelect = {this.renderDateSelect()}
          TimeSelect = {this.renderTimeSelect()}
          Summary = {this.renderSummary()}
          updateIndex = {(index) => this.handleChangeIndex(index)}
        />
      );
    }
  }

  validSubmit(){
    let weekday = this.state.date.getDay();
    let hours = this.state.date.getHours();
    let minutes = this.state.date.getMinutes();

    let minHours = 0;
    let maxHours = 24;

    switch(weekday){
      //Monday, Tuesday, Friday
      case 1:
      case 2:
      case 5: {
        minHours = 8;
        maxHours = 19;
        break;
      }
      //Wednesday & Thursday
      case 3:
      case 4: {
        minHours = 10;
        maxHours = 19;
        break;
      }
      //Saturday
      case 6: {
        minHours = 9;
        maxHours = 14;
        break;
      }
    }

    if(hours < minHours || hours >= maxHours)
      return false;
    else if (hours === maxHours-1 && minutes > 0 && this.state.sessionType === "body")
      return false;
    return true;
  }

  mobilecheck = ()=> {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    // console.log("check: " +check);
    return check;
  };
}

export default withRouter(Appointment);
