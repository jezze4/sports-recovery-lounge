import React, {PureComponent, useState} from 'react';
import { Scheduler, DayView, Appointments } from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';
import Button from '@material-ui/core/Button';


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
  const{startDate} = props;
  const date = new Date(startDate);
  return(
    // <div {...props} className="time-scale-cell">
    //   <div>{(date.getHours()===12) ? '12' : date.getHours()%12}:00</div>
    //   <br/>
    //   <div>{(date.getHours()===12) ? '12' : date.getHours()%12}:30</div>
    //   <br />
    // </div>
      <DayView.TimeScaleCell {...props} className="time-scale-cell"/>
  );
}

const DayScaleLayout = ({...props}) => {
  return <DayView.DayScaleLayout {...props} className="day-scale-layout" />
}

const DayScaleCell = ({...props}) => {
  return <DayView.DayScaleCell {...props} className="day-scale-cell" />
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
  const idNum = ''+date.getHours()+date.getMinutes();
  const active = ''+aDate.getHours()+aDate.getMinutes();

  return(
    <DayView.TimeTableCell {...props} className="time-table-cell"
      id={(idNum===active) ? 'cell-active' : ''}
      onClick={(e)=>onSelectTime(date)}
      >
        {(date.getHours()>12) ? date.getHours()-12 : date.getHours()}:
        {(date.getMinutes()===0) ? '00' : date.getMinutes()}
        {(date.getHours() < 12) ? ' AM' : ' PM'}
    </DayView.TimeTableCell>
  );

  // function updateTime(date, e) {
  //   onSelectTime(new Date(date));
  // }
}

export default class MyScheduler extends PureComponent {

  render(){
    return(
      <Scheduler height={420} rootComponent={SchedulerRoot}>
        <ViewState
          currentDate={this.props.date}
        />
        <DayView
          startDayHour={8}
          endDayHour={19}
          cellDuration={30}
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
        <Appointments />
      </Scheduler>
    );
  }
}
