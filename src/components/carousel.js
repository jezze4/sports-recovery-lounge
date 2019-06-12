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

  renderControls(){
    return(
      <div style={{ width: '100%', position:'absolute', bottom: '40px'}}>
        {this.carouselItems.map((item, i) => (
          <Paper classes={{root: 'carousel-bt-root'}} onClick={()=>this.handleChangeIndex(i)}/>
        ))}
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
        onChangeIndex={()=>this.handleChangeIndex()}
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
}
