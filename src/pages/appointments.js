import React, {PureComponent} from 'react'
import Calendar from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = Calendar.momentLocalizer(moment)

export default class Appointments extends PureComponent {
  state={
    events: [
      {
        start: new Date(),
        end: new Date(moment().add(1, "days")),
        title: "Title"
      }
    ]
  }

  render(){
    return(
      <div>
        <h1>Make an appointment</h1>
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          style={{height: '100vh'}}
        />
      </div>
    );
  }
}
