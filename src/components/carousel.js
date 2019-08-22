import React, {PureComponent} from 'react';
import Banner from './banner';
import Paper from '@material-ui/core/Paper';
import SwipeableViews from "react-swipeable-views";
import { autoPlay, virtualize } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';


import JulySpecialImage from '../imgs/runner-girl.jpg'
import DefaultBanner from '../imgs/runner-girl2.jpg';

import '../css/carousel.css';


const InfiniteSwipe = autoPlay(virtualize(SwipeableViews));

const carouselItems=[
  // {
  //   img: JulySpecialImage,
  //   title: "July Specials!",
  //   subtitle: "Come in July for some great specials!",
  //   buttonText: "Details",
  //   buttonType: "modal",
  //   modalInfo: <span>
  //     Get 50% off your first session of NormaTec Recovery!<br/><br/>
  //     Get $5 off any subsequent NormaTec session in July!<br /><br/>
  //     Get 20% off any NormaTec Recovery multi-session package or monthly pass!
  //   </span>,
  //   align: 'right'
  // },
  {
    img: DefaultBanner,
    title: "NormaTec Recovery System",
    subtitle:<span>Recover Even Faster,<br />Like a Pro</span>,
    buttonText: "Let's Do It",
    buttonType: "link",
    buttonLink: "/appointments",
    align: "right",
  },
  // {
  //   img: DefaultImage,
  //   title: "BANNER TITLE 3",
  //   subtitle: "Banner Description of a certain length",
  // },
];

export default class Carousel extends PureComponent {

  state = {
    index: 0,
    autoplay: null,
  }

  handleChangeIndex(index){
    this.setState({index: mod(index, carouselItems.length)});
  }

  handleChangeIndexBt(index){
    this.resetInterval();
    this.setState({index: mod(index, carouselItems.length)});
  }

  renderArrows(){
    return(
      <div id="carousel-arrows" style={{position: 'absolute', top: '50%', zIndex: '100', width: '100%'}}>
        <i className="material-icons carouselControl"
          style={{position: 'absolute', left: '5%'}}
          onClick={()=>this.handleChangeIndexBt(this.state.index-1)}
          >
          arrow_back_ios
        </i>
        <i className="material-icons carouselControl"
          style={{position: 'absolute', right: '5%'}}
          onClick={()=>this.handleChangeIndexBt(this.state.index+1)}
          >
          arrow_forward_ios
        </i>
      </div>
    );
  }

  renderControls(){
    return(
      <div>
        {this.renderArrows()}
        <div id="carousel-position">
          {carouselItems.map((item, i) => (
            <Paper
              key={"carousel-bt-"+i}
              classes={{root: 'carousel-bt-root'}}
              className={mod(this.state.index, carouselItems.length)===i ? 'active' : ''}
              onClick={()=>this.handleChangeIndex(i)}
            />
          ))}
        </div>
      </div>
    );
  }

/* regular carousel */
  renderCarousel(){
    const { index } = this.state;
    return(
      <SwipeableViews
        enableMouseEvents
        resistance
        index={index}
        onChangeIndex={(i)=>this.handleChangeIndex(i)}
        springConfig={this.carouselConfig}
        >
        {carouselItems.map((item, i) =>(
          <Banner
            index={i}
            img={item.img}
            title={item.title}
            subtitle={item.subtitle}
            buttonText={item.buttonText}
          />
        ))}
      </SwipeableViews>
    );
  }

/* Infinite Carousel */
  slideRenderer(params){
    const { index, key } = params;
    const item = carouselItems[mod(index, carouselItems.length)];
    return(
      <Banner
        key={key}
        img={item.img}
        title={item.title}
        subtitle={item.subtitle}
        buttonText={item.buttonText}
        align={item.align}
        buttonType={item.buttonType}
        buttonLink={item.buttonLink}
        modalInfo={item.modalInfo}
      />
    );

  }


  resetInterval(){
    clearInterval(this.state.autoplay);
    var reset = setInterval(()=>this.handleChangeIndex(this.state.index+1), 6000);
    this.setState({autoplay: reset});
  }

  componentDidMount(){
    var autoplay = setInterval(()=>this.handleChangeIndex(this.state.index+1), 6000);
    this.setState({
      autoplay: autoplay,
    });
  }

  componentWillUnmount(){
    clearInterval(this.state.autoplay);
  }


  render(){
    return(
      <div className="carousel-container">
        {/* {this.renderCarousel()} */}
        <InfiniteSwipe
          springConfig={this.carouselConfig}
          index={this.state.index}
          slideRenderer={this.slideRenderer}
          disabled={true}
          disableLazyLoading={true}
        />
        {(carouselItems.length > 1) ? this.renderControls() : ''}
      </div>
    );
  }

  carouselConfig={
    duration: '.8s',
    easeFunction: 'ease',
    delay: '0s'
  }
}
