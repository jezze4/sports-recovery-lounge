import React, {PureComponent} from 'react';
import Paper from '@material-ui/core/Paper'
import { Scheduler, WeekView, Appointments } from '@devexpress/dx-react-scheduler-material-ui';
import { DateNavigator, Toolbar, TodayButton } from '@devexpress/dx-react-scheduler-material-ui';
import { AppointmentTooltip, AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
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
      <p>{data.user}</p>
      <Appointments.AppointmentContent {...props}	/>
    </div>
  );
}

/* AppointmentTooltip */

const tooltipHeader = ({...props}) => {

  const {appointmentData} = props;
  return(
    <div style={{textAlign: 'center', padding: '8px 16px', background: '#5FBBFF', color: 'white'}}>
      <h2 style={{fontWeight: '500'}}>{appointmentData.user}</h2>
    </div>
  );
}

const tooltipContent = ({...props}) => {
  const {appointmentData} = props;
  console.log(appointmentData);
  return(
    <div style={{padding: '0px 16px', textAlign: 'center'}}>
      <h4 style={{fontWeight: "normal"}}>Type: {appointmentData.type.toUpperCase()}</h4>
      <h4 style={{fontWeight: "normal"}}>Length: {appointmentData.length} minutes</h4>
      <AppointmentTooltip.Content {...props}/>
    </div>
  );
}

export default class Schedule extends PureComponent {

  state={
    appData: [],
    dataFetched: false
  }

  componentDidMount(){
    this.getAppointments();
  }

  getAppointments(){
    srl_db.collection("appointments").get()
      .then(query => query.docs.map(doc => doc.data()))
      .then(docs => this.setState({appData: docs}))
  }

  render(){
    return(
      <Paper className="schedule-container">
        <h1>Total Appointments: {this.state.appData.length}</h1>
        <Scheduler rootComponent={SchedulerRoot} data={this.state.appData}>

          <ViewState
            // currentDate={this.props.date}
          />
          <WeekView
            excludedDays={[0]}
            startDayHour={8}
          />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <Appointments
            containerComponent={ScheduledAppointment}
            appointmentContentComponent={appointmentContent}
          />
          <AppointmentTooltip
            showCloseButton
            headerComponent={tooltipHeader}
            contentComponent={tooltipContent}
            // showOpenButton
          />
        </Scheduler>
      </Paper>
    );
  }
}
