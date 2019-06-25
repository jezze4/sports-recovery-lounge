import React, {PureComponent} from 'react';

export default class GoldIcon extends PureComponent{
  
  /* quick CSS style to avoid creating an unnecessary .css file */
  borderStyle={
    margin: '8px',
    padding: '4px',
    background: 'linear-gradient(to bottom, white, #FFCC66, black)',
    maxHeight: '8em',
    maxWidth: '8em',
    borderRadius: '5px'
  }

  iconStyle={
    borderColor: 'linear-gradient(to bottom, white, gold, black)',
    objectFit: 'contain',
    height: '100%',
    width: '100%',
    borderRadius: '5px',
  }

  render(){
    return(
      <div style={this.borderStyle}>
        <img src={this.props.img} alt="" style={this.iconStyle}/>
      </div>
    );
  }
}
