import React, {PureComponent} from 'react';
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { Scheduler, WeekView, Appointments } from '@devexpress/dx-react-scheduler-material-ui';
import { DateNavigator, Toolbar, TodayButton } from '@devexpress/dx-react-scheduler-material-ui';
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';

import {srl_db} from '../components/firebase.js';

import '../css/schedule.css';

const SchedulerRoot = ({...props}) => {
  return <Scheduler.Root	{...props} className="admin-schedule-root" />
}

const ScheduledAppointment = ({...props}) => {
  return <Appointments.Container {...props} className="admin-appointment"/>
}

const appointmentContent = ({...props}) => {
  const {data} = props;
  return(
    <div style={{color: 'white'}}>
      <p>{data.username}</p>
      <Appointments.AppointmentContent {...props}	/>
    </div>
  );
}

/* AppointmentTooltip */

const tooltipHeader = ({commandButtonIds, ...restProps}) => {

  const {appointmentData} = restProps;
  return(
    <div style={{textAlign: 'center', padding: '8px 16px', background: '#5FBBFF', color: 'white'}}>
      <h2 style={{fontWeight: '500'}}>{appointmentData.username}</h2>
    </div>
  );
}


export default class Schedule extends PureComponent {

  state={
    appData: [],
    dataFetched: false,
    visible: false,
  }

  toggleVisibility = () => {
    let visibilty = this.state.visible;
    this.setState({visible: !visibilty})
  }

  componentDidMount(){
    this.getAppointments();
  }

  getAppointments(){

    srl_db.collection("appointments").onSnapshot( snapshot => {
      this.setState({appData: []})
      snapshot.docs.forEach( doc => {
        this.setState(prevState => ({
          appData: [doc.data(), ...prevState.appData]
        }))
      })
    })
  }

  render(){
    return(
      <Paper className="schedule-container">
        <Scheduler rootComponent={SchedulerRoot} data={this.state.appData}>

          <ViewState
            // currentDate={this.props.date}
          />
          <WeekView
            excludedDays={[0]}
            startDayHour={8}
            endDayHour={20}
          />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <Appointments
            containerComponent={ScheduledAppointment}
            appointmentContentComponent={appointmentContent}
          />
          <AppointmentTooltip
            headerComponent={tooltipHeader}
            contentComponent={this.tooltipContent}
            visible={this.state.visible}
            onVisibilityChange={this.toggleVisibility}
          />
        </Scheduler>
      </Paper>
    );
  }

  tooltipContent = ({...props}) => {
    const {appointmentData} = props;
    return(
      <div style={{padding: '0px 16px', textAlign: 'left'}}>
        <p style={{fontSize: ".8em", marginBottom: '0px'}}>User ID: {appointmentData.userID}</p>
        <h4 style={{fontWeight: "normal"}}>Email: {appointmentData.user}</h4>
        <h4 style={{fontWeight: "normal"}}>Type: {appointmentData.type.toUpperCase()}</h4>
        <h4 style={{fontWeight: "normal", marginBottom: '0px'}}>Length: {appointmentData.length} minutes</h4>
        <AppointmentTooltip.Content {...props}/>
        <Button
          style={{width: 'calc(100% + 32px)', margin: '0 -16px'}}
          variant="contained"
          color="secondary"
          size="large"
          id="delete"
          onClick={()=>this.handleDelete(appointmentData)}>
          <DeleteIcon />
        </Button>
      </div>
    );
  }

  handleDelete(data) {

    let query = srl_db.collection("appointments")
    .where("userID", "==", data.userID)
    .where("startDate", "==", data.startDate);

    query.get().then( snapshot => {
      snapshot.forEach( doc => {
        console.log("Deleting...")
        this.toggleVisibility();
        doc.ref.delete();
      })
    })
    .then( alert("Appointment Deleted"))
    .catch( error => {
      console.log("Oops... something bad happened: " + error);
    })
  }
}
