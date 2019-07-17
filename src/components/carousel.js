import React, {PureComponent} from 'react';
import Banner from './banner';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SwipeableViews from "react-swipeable-views";
import { autoPlay, virtualize } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';


import DefaultImage from '../imgs/runner-girl.jpg'

import '../css/carousel.css';


const InfiniteSwipe = autoPlay(virtualize(SwipeableViews));

const carouselItems=[
  {
    img: DefaultImage,
    title: "BANNER TITLE 1",
    subtitle: "Banner Description of a certain length",
    buttonText: "button"
  },
  {
    img: DefaultImage,
    title: "BANNER TITLE 2",
    subtitle: "Banner Description of a certain length",
    buttonText: "button"
  },
  {
    img: DefaultImage,
    title: "BANNER TITLE 3",
    subtitle: "Banner Description of a certain length",
  },
];

export default class Carousel extends PureComponent {

  state = {
    index: 0
  }

  handleChangeIndex(index){
    // alert("updating...");
    // this.setState({index: mod(index, carouselItems.length)});
    this.setState({index});
  }

  renderArrows(){
    return(
      <div style={{position: 'absolute', top: '50%', zIndex: '100', width: '100%'}}>
        <i className="material-icons carouselControl"
          style={{position: 'absolute', left: '5%'}}
          onClick={()=>this.handleChangeIndex(this.state.index-1)}
          >
          arrow_back_ios
        </i>
        <i className="material-icons carouselControl"
          style={{position: 'absolute', right: '5%'}}
          onClick={()=>this.handleChangeIndex(this.state.index+1)}
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
        <div style={{ position: 'absolute', height: 'inherit', width: '100%', top: '90vh'}}>
          {carouselItems.map((item, i) => (
            <Paper
              classes={{root: 'carousel-bt-root'}}
              className={mod(this.state.index, carouselItems.length)===i ? 'active' : ''}
              onClick={()=>this.handleChangeIndex(i)}
            />
          ))}
        </div>
      </div>
    );
  }

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
      />
    );

  }

  render(){
    return(
      <div style={{height: '100vh'}}>
        {/* {this.renderCarousel()} */}
        <InfiniteSwipe
          springConfig={this.carouselConfig}
          index={this.state.index}
          // onChangeIndex={this.handleChangeIndex(this.state.index)}
          slideRenderer={this.slideRenderer}
          disabled={true}
          disableLazyLoading={true}
        />
        {this.renderControls()}
      </div>
    );
  }

  carouselConfig={
    duration: '.8s',
    easeFunction: 'ease',
    delay: '0s'
  }
}
