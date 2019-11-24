import React, {PureComponent} from 'react';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import '../css/banner.css'

export default class Banner extends PureComponent {

  state = {
    modalOpen: false,
  }

  /* Button Functions */

  /* Modal */
  renderButtonModal() {
    return(
      <Dialog
        open={this.state.modalOpen}
        onClose={()=>this.handleModalClose()}
        aria-labelledby="banner-modal-title"
        aria-describedby="banner-modal-description"
        classes={{paper: 'banner-modal-root'}}
      >
        <DialogTitle id="banner-modal-title">{this.props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="banner-modal-description">
            {this.props.modalInfo}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            style={{color: '#FFCC66'}}
            onClick={()=>this.handleModalClose()} autoFocus
          >
            Got it!
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  /* Modal helpers */
  handleModalOpen(){
    this.setState({modalOpen: true});
  }

  handleModalClose(){
    this.setState({modalOpen: false});
  }

  textAlignment(align){
    if(align === 'left')
      return "flex-start";
    else if(align === 'right')
      return "flex-end";
    else
      return "center";
  }

  calcImgOffset(){
    return this.props.index * 100 + '%';
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
      if(this.props.buttonType==="link"){
        return(
          <Grid item>
            <Button variant="contained" size="large" classes={{root: 'banner-bt-root'}} href={this.props.buttonLink}>
              {this.renderIcon(icon)}
              {title}
            </Button>
          </Grid>
        );
      }
      else if(this.props.buttonType==="modal"){
        return(
          <Grid item>
            <Button variant="contained" size="large" classes={{root: 'banner-bt-root'}} onClick={()=>this.handleModalOpen()}>
              {this.renderIcon(icon)}
              {title}
            </Button>
          </Grid>
        );
      }
    }
  }

  render(){

    return(
      <div className="banner-container">
        <div className="banner-container-inner"
        style={{backgroundImage: 'linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,0.0)), url('+this.props.img+')'}}>
          <Grid container
            direction="column"
            justify='center'
            alignItems={this.textAlignment(this.props.align)}
            style={{height: 'inherit', padding: '0 10%', background: 'rgba(0,0,0,.3)'}}>

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
          {this.renderButtonModal()}
        </div>
      </div>
    );
  }
}
