import React, {PureComponent} from 'react';
import Paper from '@material-ui/core/Paper'
import { Scheduler, WeekView, Appointments } from '@devexpress/dx-react-scheduler-material-ui';
import { DateNavigator, Toolbar, TodayButton } from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';

import {srl_db} from '../components/firebase.js';

import '../css/schedule.css';

const SchedulerRoot = ({...props}) => {
  return <Scheduler.Root	{...props} className="admin-schedule-root" />
}

const ScheduledAppointment = ({...props}) => {
  return <Appointments.Container {...props} className="admin-appointment"/>
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
          />
        </Scheduler>
      </Paper>
    );
  }
}
