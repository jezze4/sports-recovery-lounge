import React, {PureComponent} from 'react';
import Banner from './banner';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from 'react-swipeable-views-utils';


import '../css/carousel.css'


export default class Carousel extends PureComponent {

  carouselItems=[
    {
      img: "https://drive.google.com/uc?export=view&id=1rv9PipbkqwNU1CnxH1uZfUOQWqL8uyj3",
      title: "BANNER TITLE",
      subtitle: "Banner Description of a certain length",
      buttonText: "button"
    },
    {
      img: "https://drive.google.com/uc?export=view&id=1rv9PipbkqwNU1CnxH1uZfUOQWqL8uyj3",
      title: "BANNER TITLE 2",
      subtitle: "Banner Description of a certain length",
      buttonText: "button"
    },
    {
      img: "https://drive.google.com/uc?export=view&id=1rv9PipbkqwNU1CnxH1uZfUOQWqL8uyj3",
      title: "BANNER TITLE 3",
      subtitle: "Banner Description of a certain length",
    },
  ];

  state = {
    index: 0
  }

  test(){
    console.log("length: " + this.carouselItems.length);
    this.carouselItems.map(item => (
      console.log(item.title),
      console.log(item.subtitle)
    ));
  }

  handleClick(index){
    alert("clicked " + index);
  }

  handleChangeIndex(index){
    this.setState({index});
  }

  renderArrows(){
    return(
      <div style={{position: 'absolute', top: '50%', zIndex: '100', width: '100%'}}>
        <i className="material-icons carouselControl"
          style={{position: 'absolute', left: '5%'}}
          onClick={()=>this.handleChangeIndex((this.state.index+(this.carouselItems.length-1))%(this.carouselItems.length))}
          >
          arrow_back_ios
        </i>
        <i className="material-icons carouselControl"
          style={{position: 'absolute', right: '5%'}}
          onClick={()=>this.handleChangeIndex((this.state.index+1)%this.carouselItems.length)}
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
          {this.carouselItems.map((item, i) => (
            <Paper
              classes={{root: 'carousel-bt-root'}}
              className={this.state.index===i ? 'active' : ''}
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
        {this.carouselItems.map((item, i) =>(
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

  render(){
    return(
      <div style={{height: '100vh'}}>
        {/* <Banner
          img="https://drive.google.com/uc?export=view&id=1rv9PipbkqwNU1CnxH1uZfUOQWqL8uyj3"
          title="BANNER TITLE"
          subtitle="BANNER TITLE"
          buttonText="button"
        /> */}
        {this.renderCarousel()}
        {this.renderControls()}
      </div>
    );
  }

  carouselConfig={
    duration: '.5s',
    easeFunction: 'ease',
    delay: '0s'
  }
}
