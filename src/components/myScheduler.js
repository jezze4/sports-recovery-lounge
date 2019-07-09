import React, {PureComponent} from 'react';
import { Scheduler, DayView, Appointments } from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';


const SchedulerRoot = ({...props}) => {
  return <Scheduler.Root	{...props} className="scheduler-root" />
}

const DayViewLayout = ({...props}) => {
  return <DayView.Layout {...props} className="day-view-layout" />
}

const TimeScaleLayout = ({...props}) => {
  return <DayView.TimeScaleLayout {...props} className="time-scale-layout" />
}

const TimeScaleCell = ({...props}) => {
  return <DayView.TimeScaleCell {...props} className="time-scale-cell" />
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

const TimeTableCell = ({...props}) => {
  const {startDate} = props;
  const date = new Date(startDate);
  return <DayView.TimeTableCell {...props} className="time-table-cell"/>

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
          timeTableCellComponent={TimeTableCell}
        />
        <Appointments />
      </Scheduler>
    );
  }
}
