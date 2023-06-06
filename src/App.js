import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Github from './Github';
import Headers from './Components/Headers'
import React, { Component } from 'react';
import Auth0Lock from 'auth0-lock';


class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      accessToken : '',
      profile : {}
    }
  }

  static defaultProps = {
    clientId: 'N7J3Rg0vWXQ4D93q6nlQX5m0ZoP7UhtV',
    domain :'dev-8ezjbpaac8tbla1b.us.auth0.com'
  }

  componentWillMount(){

    this.lock = new Auth0Lock(this.props.clientId, this.props.domain)

    this.lock.on('authenticated',(authResult) => {
      console.log('My profile')
      console.log(authResult)
        this.lock.getProfile(authResult.accessToken, (error,profile) => {
          if(error){
            //console.log(error)
            return;
          }
          //console.log(profile)
          this.setProfile(authResult.accessToken, profile)
        })
    })
    this.getProfile()
  }

  setProfile(accessToken, profile){
    localStorage.setItem('accessToken',accessToken)
    localStorage.setItem('profile',JSON.stringify(profile))

    this.setState({
      accessToken: localStorage.getItem('accessToken'),
      profile: JSON.parse(localStorage.getItem('profile'))
    })


  }


  getProfile(){
    if(localStorage.getItem('accessToken')!=null){
      this.setState({
        accessToken: localStorage.getItem('accessToken'),
      profile: JSON.parse(localStorage.getItem('profile'))
      },()=>{
        console.log(this.state)
      })
    }
  }

  showLock(){
    this.lock.show()
  }

  logout(){
    this.setState({
      accessToken : '',
      profile : {}
    }, ()=>{
      localStorage.removeItem('accessToken')
      localStorage.removeItem('profile')
    })
  }

  render(){

    let gitty;
    if(this.state.accessToken){
      gitty = <Github/>
    }else{
      gitty = "Click on login to view github viewer"
    }
  return (
    <div className="App">
      <header className="App-header">
        <Headers 
        lock = {this.lock}
        accessToken = {this.state.accessToken}
        onLogout={this.logout.bind(this)}
        onLogin={this.showLock.bind(this)}/>
       
        {gitty}
      </header>
    </div>
  );
  }
}

export default App;
