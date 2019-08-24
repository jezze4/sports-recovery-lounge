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
    appData: []
  }

  componentDidMount(){
    this.getAppointments();
  }

  getAppointments(){
    srl_db.collection("appointments")
      .get()
      .then(query => query.docs.map(doc => doc.data()))
      .then(docs => this.setState({appData: docs}))
      .then(res => this.setState({dataFetched: true}));
  }

  render(){
    return(
      <Paper className="schedule-container">
        <Scheduler rootComponent={SchedulerRoot} data={this.state.appData}>
          {/* Update the schedulerData */}
          <ViewState
            // currentDate={this.props.date}
          />
          <WeekView
            excludedDays={[0]}
            startDayHour={8}
            // endDayHour={19}
            // cellDuration={this.props.duration}
            // layoutComponent={DayViewLayout}
            // timeScaleLayoutComponent={TimeScaleLayout}
            // timeScaleCellComponent={TimeScaleCell}
            // dayScaleLayoutComponent={DayScaleLayout}
            // dayScaleCellComponent={DayScaleCell}
            // dayScaleEmptyCellComponent={DayScaleEmptyCell}
            // timeTableLayoutComponent={TimeTableLayout}
            // timeTableCellComponent={({...props})=>
            //   TimeTableCell(this.props.onSelectTime, this.props.date, {...props})}
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
