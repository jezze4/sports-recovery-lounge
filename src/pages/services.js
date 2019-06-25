import React, {PureComponent} from 'react';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import GoldIcon from '../components/goldIcon';

/*images for icons*/
import iHypervolt from '../imgs/icons/icon-hypervolt.jpg';
import iMyostorm from '../imgs/icons/icon-myostormmeteor.jpg';
import iR8roller from '../imgs/icons/icon-r8roller.jpg';
import iVyper from '../imgs/icons/icon-vyper.jpg';

export default class Services extends PureComponent{
  render(){
    return(
      <Grid container direction="row" id="services-container" style={{background: 'black', height: '100vh', padding: '20%'}}>
        <GoldIcon img={iHypervolt}/>
        <GoldIcon img={iMyostorm}/>
        <GoldIcon img={iR8roller}/>
        <GoldIcon img={iVyper}/>
      </Grid>
    );
  }
}
