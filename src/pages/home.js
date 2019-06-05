import React, {PureComponent, Fragment} from 'react';
import Banner from '../components/banner'

export default class Home extends PureComponent {
  render(){
    return(
      <Fragment>
        <Banner
          img="https://drive.google.com/uc?export=view&id=1-KSKvU8P1CveoELHrR1qzc1kt40z8Avt"
        />
      </Fragment>
    );
  }
}
