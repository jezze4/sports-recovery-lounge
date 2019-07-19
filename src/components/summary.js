import React, {PureComponent} from 'react';
import Card from '@material-ui/core/Card';
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
          <CardMedia
            classes={{media: 'summary-media'}}
            component="img"
            alt={this.props.title}
            src={this.props.img}
            title={this.props.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h3" component="h2" className="summary-title">
              {this.props.title}
            </Typography>
            <Typography color="textSecondary" component="p" className="summary-info">
              {this.props.info}
            </Typography>
          </CardContent>
          <Button variant="outlined" size="large" classes={{root: 'summary-bt-root'}} href={this.props.link}>
            <Typography>{this.props.button}</Typography>
          </Button>
      </Card>
    );
  }
}
