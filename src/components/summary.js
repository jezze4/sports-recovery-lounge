import React, {PureComponent, Fragment} from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


import '../css/summary.css'


/* Summary of a Pages used for Home.js */

export default class Summary extends PureComponent {
  render(){
    return(

      <Card className="summary-card" elevation={0}>
        {/* <CardActionArea> */}
          <CardMedia
            classes={{media: 'summary-media'}}
            component="img"
            alt="Contemplative Reptile"
            src="https://drive.google.com/uc?export=view&id=1rv9PipbkqwNU1CnxH1uZfUOQWqL8uyj3"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Summary
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
              across all continents except Antarctica
            </Typography>
          </CardContent>
          <Button variant="outlined" size="large" classes={{root: 'summary-bt-root'}}>
            <Typography>Make an Appointment</Typography>
          </Button>

        {/* </CardActionArea> */}
      </Card>
    );
  }
}
