import React, {PureComponent} from 'react';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import GoldIcon from '../components/goldIcon';
// import TempImg from '../imgs/logo.png';

/*images for icons*/
import NormatecText from '../imgs/icons/normatec-white.png';
import IconNormatec from '../imgs/icons/icon-normatec.jpg';
import IconHypervolt from '../imgs/icons/icon-hypervolt.jpg';
import IconMyostorm from '../imgs/icons/icon-myostormmeteor.jpg';
import IconR8roller from '../imgs/icons/icon-r8roller.jpg';
import IconVyper from '../imgs/icons/icon-vyper.jpg';

import '../css/services.css';

export default class Services extends PureComponent{

  state = {
    isMobile: false
  }

  componentWillMount(){
    this.setState({
      isMobile: this.mobilecheck()
    })
  }

  /* Services */

  serviceDetails={
    normatec: {
      image: IconNormatec,
      title: <img id="normatec-title" src={NormatecText} alt="NORMATEC"></img>,
      details: <span>
                Normatec's patented compression technology has revolutionized
                athlete recovery. Reduce pain and soreness, rejuvenate muslces,
                boost circulation, and recover faster in between training.
              </span>
    },
    hypervolt: {
      image: IconHypervolt,
      title: "Hypervolt",
      details:  <span>
                  State-of-the-art percussion massage device that helps relax
                  sore and stiff muscles to improve mobility.
                </span>},
    vyper: {
      image: IconVyper,
      title: "Vyper 2.0",
      details:  <span>
                  Vibrating fitness roller allows you to warm up, activate, and
                  recover faster and more effectively. Optimal self myofascial
                  release tool to increase flexibility, circulation, and reduce
                  soreness. Increase range of motion by up to 40%.
                </span>},
    myostorm: {
      image: IconMyostorm,
      title: "Myostorm Meteor",
      details:  <span>
                  New and revolutionary muscular recovery device designed to
                  help relieve muscular pain, improve blood circulation, increase
                  flexibility and muscle pliability, speed up the recovery process,
                  and increase performance.
                </span>},
    roller: {
      image: IconR8roller,
      title: "R8 DTM Roller",
      details:  <span>
                  The R8 Deep Tissue Massage Roller is an FDA-registered medical device designed to reduce inflammation,
                  break up muscle adhesions, and stimulate blood circulation.
                </span>},
  }

  renderCompression(){
    return(
      <Grid container className="services-section" id="massages" >
        <Grid item sm={12}>
          <Typography variant="h3" className="services-title">Compression Therapy</Typography>
          <div className="underbar"></div>
        </Grid>
        {this.renderService(this.serviceDetails['normatec'])}
      </Grid>
    );
  }

  renderMassage(){
    return(
      <Grid container className="services-section" id="massages" >
        <Grid item sm={12}>
          <Typography variant="h3" className="services-title">Self-Myofascial Release</Typography>
          <div className="underbar"></div>
        </Grid>

        <Grid item container direction="row" className="services-details" justify="space-between" alignItems="stretch">
          {this.renderService(this.serviceDetails['hypervolt'])}
          {this.renderService(this.serviceDetails["vyper"])}
        {/* </Grid> */}

        {/* <Grid item container direction="row" justify="space-between" alignItems="stretch"> */}
          {this.renderService(this.serviceDetails["myostorm"])}
          {this.renderService(this.serviceDetails["roller"])}
        </Grid>
      </Grid>
    );
  }

  renderService(service){
    return(
      <Grid container item xs={11} sm={5} direction="row" className="massage-section" justify="center" alignItems="flex-start">
        <Grid item sm={3}>
          <GoldIcon img={service.image} />
        </Grid>
        <Grid item sm={9} className="massage-text-container">
          <Typography className="device-name" variant="h4">{service.title}<div className="underbar"></div></Typography>
          <Typography className="massage-text">
            {service.details}
          </Typography>
        </Grid>
      </Grid>
    );
  }

  /* Pricing */

  pricingData = {
    single : {
      title: "Single Sessions",
      data: [
        {title: "20 minutes", price: 15.00},
        {title: "30 minutes", price: 20.00},
        {title: "60 minutes", price: 30.00},
        {title: "Full Body *", price: 35, note: "* By appointment only"}]},

    massage : {
      title: <span id="pricing-title-smr">Self-Myofascial Release</span>,
      data:[
        {title: "10 minutes", price: 5.00},
        {title: "30 minutes", price: 10.00},
        {title: "60 minutes", price: 15.00}]},

    session30 : {
      title: "Weekly",
      data: [
        {title: "20 minutes", price: 26.20},
        {title: "30 minutes", price: 30.60},
        {title: "60 minutes", price: 42.00}]},

    session60 : {
      title: "Monthly",
      data: [
        {title: "20 minutes", price: 59.00},
        {title: "30 minutes", price: 79.00},
        {title: "60 minutes", price: 99.00}]}
  }

  renderPricing(){
    return(
      <Grid container direction="column" id="pricing-container">
        <Typography variant="h3" className="pricing-title">Pricing</Typography>
        <div className="underbar" />
        <Grid item container direction="row" justify="space-between" alignItems="flex-start" id="price-section2">
          <Grid container item direction="row" sm={6} justify="space-around" id="price-memberships">
            <Grid item sm={12}><Typography className="memberships-title">Memberships</Typography></Grid>
            <Grid item className="membership" sm={5}>{this.renderPriceSection(this.pricingData.session30)}</Grid>
            <Grid item className="membership" sm={5}>{this.renderPriceSection(this.pricingData.session60)}</Grid>
          </Grid>
          <Grid item container direction="row" sm={6} justify="space-around">
            <Grid item sm={12}><Typography className="memberships-title">Individual</Typography></Grid>
            <Grid item sm={5}>{this.renderPriceSection(this.pricingData.single)}</Grid>
            <Grid item sm={5}>{this.renderPriceSection(this.pricingData.massage)}</Grid>
          </Grid>
        </Grid>
        <Grid item container direction="row" id="price-section1">
          <Grid item sm={3}>
          </Grid>
        </Grid>

        <Typography style={{color: 'gray', textAlign: 'left', margin: '0 5vw'}}>
          * By appointment only <br />
          ** Complimentary 15 minutes Self-Massage Device Session with ANY Normatec Single Session purchase
        </Typography>
      </Grid>
    );
  }

  renderPriceSection(data){
    return(
      <Grid item container direction="column" className="pricing-section">
        <Typography className="pricing-section-title" gutterBottom>{data.title}</Typography>

        {data.data.map((item, i) =>
          <Grid key={data.title+item.title} item container direction="row" justify="space-evenly" className="pricing-details">
            <Grid item xs={6}>
              <Typography className="pricing-detail-text">{item.title}: &nbsp;</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className="pricing-detail-text">${item.price.toFixed(2)}</Typography>
            </Grid>
          </Grid>
        )}

      </Grid>
    );
  }

  renderDesktop(){
    return(
      <div>
        <Grid container direction="column" id="services-container" >
          {this.renderCompression()}
          {this.renderMassage()}
        </Grid>
          {this.renderPricing()}
      </div>
    );
  }

  renderMobile(){
    return(
      <div>
        <Grid container direction="column" id="services-container" >
          {this.renderCompression()}
          {this.renderMassage()}
        </Grid>
          {this.renderPricing()}
      </div>
    );
  }

  render(){
    const {isMobile} = this.state;
    if(!isMobile){
      return( this.renderDesktop() );
    } else {
      return( this.renderMobile() );
    }

  }

  mobilecheck = ()=> {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };
}
