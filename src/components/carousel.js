import React, {PureComponent} from 'react';
import Banner from './banner';

import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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

  renderControls(){
    return(
      <div style={{ width: '100%', position:'absolute', bottom: '40px'}}>
        {this.carouselItems.map((item, i) => (
          <Paper classes={{root: 'carousel-bt-root'}} onClick={()=>this.handleClick(i)}/>
        ))}
      </div>
    );
  }

  render(){
    return(
      <div style={{height: '100vh'}}>
        {this.test()}
        <Banner
          img="https://drive.google.com/uc?export=view&id=1rv9PipbkqwNU1CnxH1uZfUOQWqL8uyj3"
          title="BANNER TITLE"
          subtitle="BANNER TITLE"
          buttonText="button"
        />
        {this.renderControls()}
      </div>
    );
  }
}
