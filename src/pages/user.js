import React, {PureComponent} from 'react';
import Login from '../components/login';
import Profile from '../components/profile';


export default class User extends PureComponent {

  state = {
    username: null
  }

  getUser = (returnFunction) => {
    returnFunction(this.state.username);
  }

  componentDidMount(){
    if(this.props.getUser !== undefined){
      this.getUser(this.props.getUser);
    }
    if(this.props.user !== undefined){
      this.setState({username: this.props.user})
    }
  }

  render(){
    if(this.props.render===true)
      return(
        <h1>Hello</h1>
      );
    else {
      return(null);
    }
  }
}
