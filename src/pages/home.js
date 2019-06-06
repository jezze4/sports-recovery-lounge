import React, {PureComponent, Fragment} from 'react';
import Banner from '../components/banner'
import Appointments from './appointments'

export default class Home extends PureComponent {
  render(){
    return(
      <Fragment>
        <Banner
          img="https://drive.google.com/uc?export=view&id=1rv9PipbkqwNU1CnxH1uZfUOQWqL8uyj3"
        />
        <Appointments />
      </Fragment>
    );
  }
}
