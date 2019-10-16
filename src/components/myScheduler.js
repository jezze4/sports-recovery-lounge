import React, {PureComponent} from 'react';
import { Scheduler, DayView, Appointments } from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';
import Grid from '@material-ui/core/Grid'


const SchedulerRoot = ({...props}) => {
  return <Scheduler.Root	{...props} className="scheduler-root" />
}

const DayViewLayout = ({...props}) => {
  return <DayView.Layout {...props} className="day-view-layout" />
}

const TimeScaleLayout = ({...props}) => {
  return (
    <DayView.TimeScaleLayout {...props} className="time-scale-layout">
    </DayView.TimeScaleLayout>);
}

const TimeScaleCell = ({...props}) => {
  // const{startDate} = props;
  // const date = new Date(startDate);
  return(
    <DayView.TimeScaleCell {...props} className="time-scale-cell"/>
  );
}

const DayScaleLayout = ({...props}) => {
  return <DayView.DayScaleLayout {...props} className="day-scale-layout" />
}

const DayScaleCell = ({...props}) => {
  return <DayView.DayScaleCell {...props} className="day-scale-cell" />
  // return null;
}

const DayScaleEmptyCell = ({...props}) => {
  return <DayView.DayScaleEmptyCell {...props} className="day-scale-cell-empty" />
}

const TimeTableLayout = ({...props}) => {
  return <DayView.TimeTableLayout {...props} className="time-table-layout" />
}

function TimeTableCell (onSelectTime, activeDate, {...props}) {
  const {startDate} = props;
  const date = new Date(startDate);
  const aDate = new Date(activeDate);
  const idNum = ''+date.getHours()+'-0';
  const idNum2 = ''+date.getHours()+'-20';
  const idNum3 = ''+date.getHours()+'-40';
  const active = ''+aDate.getHours()+'-'+aDate.getMinutes();
  const isValid = validTime(date);

  console.log(aDate.getMinutes())

  return(
    <Grid container direction="row" justify="space-around" alignItems="center" component="td">
      <Grid item style={{width: '40%'}}>
        <DayView.TimeTableCell {...props} component="span"
          className={"time-table-cell" + ((!isValid)?" invalid-time" : "")}
          id={(idNum===active) ? 'cell-active' : ''}
          onClick={(e)=>onSelectTime(date)}
          >
            {(date.getHours()>12) ? date.getHours()-12 : date.getHours()}:
            {(date.getMinutes()===0) ? '00' : date.getMinutes()}
            {(date.getHours() < 12) ? ' AM' : ' PM'}
        </DayView.TimeTableCell>
      </Grid>
      <Grid item style={{width: '40%'}}>
        <DayView.TimeTableCell {...props} component="span"
          className={"time-table-cell" + ((!isValid)?" invalid-time" : "")}
          id={(idNum2===active) ? 'cell-active' : ''}
          onClick={(e)=>onSelectTime(date.setMinutes(30))}
          >
            {(date.getHours()>12) ? date.getHours()-12 : date.getHours()}:
            {(date.getMinutes()===0) ? '30' : date.getMinutes()}
            {(date.getHours() < 12) ? ' AM' : ' PM'}
        </DayView.TimeTableCell>
      </Grid>
      {/* <Grid item>
        <DayView.TimeTableCell {...props} component="span"
          className={"time-table-cell" + ((!isValid)?" invalid-time" : "")}
          id={(idNum3===active) ? 'cell-active' : ''}
          onClick={(e)=>onSelectTime(date.setMinutes(40))}
          >
            {(date.getHours()>12) ? date.getHours()-12 : date.getHours()}:
            {(date.getMinutes()===0) ? '40' : date.getMinutes()}
            {(date.getHours() < 12) ? ' AM' : ' PM'}
        </DayView.TimeTableCell>
      </Grid> */}
    </Grid>
  );
}

function validTime(cellDate){
  const today = new Date();
  if(today.getTime() >= cellDate.getTime())
    return false
  return true;
}

const ScheduledAppointment = ({...props}) => {
  return <Appointments.Container {...props} className="scheduled-appointment"/>
}

export default class MyScheduler extends PureComponent {

  state = {
    appointments: [],
    startHour: 8,
    endHour: 19,
  }

  fetchAppData(appData){
    if(appData.length > 0){
      this.setState({appointments: appData});
    }
  }

  /* 0 = Sunday, ...  */
  fetchHours(date){
    var day = date.getDay();

    switch (day) {
      case 1:
      case 2:
      case 5: {
        this.setState({
          startHour: 8,
          endHour: 19
        });
        break;
      }
      case 3:
      case 4: {
        this.setState({
          startHour: 10,
          endHour: 19
        });
        break;
      }
      case 6: {
        this.setState({
          startHour: 9,
          endHour: 14
        });
        break;
      }

      default: {
        this.setState({
          startHour: 0,
          endHour: 0
        })
      }
    }
  }

  componentDidUpdate(){
    this.fetchAppData(this.props.AppData);
    this.fetchHours(this.props.date);
  }

  render(){
    return(
      <Scheduler height={420} rootComponent={SchedulerRoot} data={this.state.appointments}>
        {/* Update the schedulerData */}
        <ViewState
          currentDate={this.props.date}
        />
        <DayView
          startDayHour={this.state.startHour}
          endDayHour={this.state.endHour}
          // intervalCount={2}
          // cellDuration={this.props.duration}
          cellDuration={60}
          layoutComponent={DayViewLayout}
          timeScaleLayoutComponent={TimeScaleLayout}
          timeScaleCellComponent={TimeScaleCell}
          dayScaleLayoutComponent={DayScaleLayout}
          dayScaleCellComponent={DayScaleCell}
          dayScaleEmptyCellComponent={DayScaleEmptyCell}
          timeTableLayoutComponent={TimeTableLayout}
          timeTableCellComponent={({...props})=>
            TimeTableCell(this.props.onSelectTime, this.props.date, {...props})}
        />
        <Appointments
          containerComponent={ScheduledAppointment}
        />
      </Scheduler>
    );
  }
}
