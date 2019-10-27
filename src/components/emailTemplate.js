import React, {PureComponent} from 'react';

export default class EmailTemplate extends PureComponent {


  /* to Admin after submitting appointment */

  renderAdminConfirmation(templateParams, mobile){
    // var templateParams = this.props.templateParams;
    return(
      <div style={{padding: "16px 0", margin: "24px 0", textAlign: "center"}}>
        <p style={{textAlign: "center"}}>
          <span style={{fontSize: "24pt", color: "#474747"}}>
            New Appointment Alert!
          </span>
        </p>
        <p>&nbsp;</p>
        <div style={{
          display: "inline-block",
          width: "500px",
          fontSize: "18pt",
          color: "#474747",
          textAlign: "center",
          boxShadow: "0 4px 8px gold",
          borderRadius: "12px"}}>
          <p style={{color: "#bfa561"}}>Here are the details</p>
          <div
            style={{
              background: "radial-gradient(gold, white)",
              margin: "0 10%",
              width: "80%",
              height: "2px"}} />
          <div style={{ marginLeft: '10vw', fontSize: '.9em', textAlign: 'left'}}>
            <p>User:&nbsp;&nbsp;&nbsp;&nbsp; {templateParams.user_name}</p>
            <p>Email:&nbsp;&nbsp;&nbsp; {templateParams.user_email}</p>
            <p>Date:&nbsp;&nbsp;&nbsp;&nbsp; {templateParams.appt_date}</p>
            <p>Start:&nbsp;&nbsp;&nbsp; {templateParams.appt_start}</p>
            <p>Type:&nbsp;&nbsp;&nbsp;&nbsp; {templateParams.appt_type}</p>
            <p>Length:&nbsp; {templateParams.appt_length} minutes</p>
          </div>
        </div>
      </div>
    );
  }

  /* to User after creating an account */

  /* Alert User of upcoming appointment */

  render(){
    if(this.props.AdminConfirmation)
      this.renderAdminConfirmation();
    else
      return(null);
  }

  desktopStyle = {
    width: '60%',
    fontSize: '1em',
  }

  mobileStyle = {
    fontSize: '.8em'
  }
}
