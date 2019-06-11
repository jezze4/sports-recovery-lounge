import React, {PureComponent} from 'react';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import '../css/banner.css'

export default class Banner extends PureComponent {

  textAlignment(align){
    if(align === 'left')
      return "flex-start";
    else if(align === 'right')
      return "flex-end";
    else
      return "center";
  }

  renderIcon(icon){
    if(icon !== undefined){
      return(
        <i className="material-icons md-24" style={{color: 'white'}}> {icon}</i>
      );
    }
  }

  renderButton(title, icon){
    if(title !== undefined){
      return(
        <Grid item>
          <Button variant="contained" size="large" classes={{root: 'banner-bt-root'}}>
            {this.renderIcon(icon)}
            {title}
          </Button>
        </Grid>
      );
    }
  }

  render(){
    return(
      <div className="banner-container">
        <img src={this.props.img} id="banner-img" alt="banner"/>
        <Grid container
          direction="column"
          justify='center'
          alignItems={this.textAlignment('right')}
          style={{height: 'inherit', padding: '0 5%'}}>

          <Grid container direction="column" justify='center' alignItems="flex-start"  id="banner-desc">
            <Grid item>
              <Typography className="banner-text" id="banner-title" component="div">
                {this.props.title}
              </Typography>
            </Grid>
            <Grid item>
              <Typography className="banner-text" id="banner-subtitle" gutterBottom>
                {this.props.subtitle}
              </Typography>
            </Grid>
            {this.renderButton(this.props.buttonText, this.props.buttonIcon)}
          </Grid>

        </Grid>
      </div>
    );
  }
}
