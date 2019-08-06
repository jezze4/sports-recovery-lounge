import React, {PureComponent} from 'react';
import Carousel from '../components/carousel'
import Summary from '../components/summary.js'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';

import '../css/home.css'
import AboutImage from '../imgs/runner-girl.jpg';
import BenefitsImage from '../imgs/benefits-girl.jpg'
import BenefitsImageM from '../imgs/benefits-girl-mobile.jpg'

/* Summary Image */
import FirstSummary from '../imgs/runner-girl2.jpg';


export default class Home extends PureComponent {

  componentWillMount(){
    this.setState({isMobile: this.mobilecheck()});
  }

  renderSummaries(){
    return(
      <Grid container justify="center" id="summary-container">
        <Grid container item direction="row" id="section-summary" alignItems="stretch">
          <Grid item xs={10} sm={4} className="summary-card-container">
            <Summary
              title="Want In?"
              img={FirstSummary}
              info="Recover like the pros! Set up an appointment and find why this technology is becoming so popular!"
              button="Reserve a Spot"
              link="/appointments"
            />
          </Grid>
          <Grid item xs={10} sm={4} className="summary-card-container">
            <Summary
              title="Services"
              img={BenefitsImage}
              info="We offer a great variety of equipment to relax those muscles and make you feel amazingly refreshed to continue pushing yourself to be the best version of yourself."
              button="Read More"
              link="/services"
            />
          </Grid>
          <Grid item xs={10} sm={4} className="summary-card-container">
            <Summary
              title="Us"
              img={AboutImage}
              info=<span>
                Everyone has a story. We are here to help YOU. We are not noobs at this.
                <br/>Trust us. We know what we're doing. :)</span>
              button="Read More"
              link="/about"
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }

  renderBenefits(){
    return(
      <Grid container id="section-benefits" justify="flex-start" alignItems="center"
        style={{
          background: 'linear-gradient(to bottom right, rgba(250,210,0,0), rgba(0,0,0,.5)), url('+
            ((this.state.isMobile) ? BenefitsImageM : BenefitsImage)
            +')',

          background: ((this.state.isMobile) ?
            'linear-gradient(to bottom, rgba(0,0,0,.5), rgba(0,0,0,.8)), url('+ BenefitsImageM +')' :
            'linear-gradient(to bottom right, rgba(250,210,0,0), rgba(0,0,0,.5)), url('+ BenefitsImage +')' ),
          minHeight: '100vh',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          color: 'white'
        }}
        >
          <Grid item id="benefits-text">
            <Typography variant="h2" id="benefits-title">
              WHO WOULD BENEFIT FROM COMPRESSION THERAPY?
              <div className="underbar"/>
            </Typography>
            <br/><br/>
            <Typography variant="body2" component="div" className="benefits-bullets">
              <span className="gold-bullet"/>
              Any athlete who uses his/her legs: Runners, Swimmers, Cyclists, Crossfitters, etc.
              <br/>
              <span className="gold-bullet"/>
              <div className="underbar underbar-bullets"/>
              Athletes of all sports including football, basketball, baseball, soccer, volleyball, etc.
              <br/>
              <span className="gold-bullet"/>
              <div className="underbar underbar-bullets"/>
              Anyone who works on his/her feet all day, because gravity causes poor circulation in your legs
              when you are standing all day. Nurses, doctors, construction, and numerous professions benefit.
              <br/>
              <span className="gold-bullet"/>
              <div className="underbar underbar-bullets"/>
              Anyone who battles poor circulation would benefit: diabetes, varicose, peripheral artery disease,
              and just about any circulation disease with the exception of deep vein thrombosis.
              <br/>
              <span className="gold-bullet"/>
              <div className="underbar underbar-bullets"/>
              Finally, anyone who enjoys a relaxing massage!
            </Typography>
          </Grid>
      </Grid>
    );
  }

  render(){
    return(
      <div>
        <Carousel />
        {this.renderSummaries()}
        {this.renderBenefits()}
      </div>
    );
  }

  mobilecheck = ()=> {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    console.log("check: " +check);
    return check;
  };
}
