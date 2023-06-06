import React, {Component} from 'react';
import ReactDOM from "react-dom";
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
class Headers extends Component{

    onLogin(){
        this.props.onLogin()
    }

    onLogout(){
        this.props.onLogout()
    }
    render(){

        let page;
        if (this.props.accessToken){
            page = <NavItem onClick={this.onLogout.bind(this)} href= "#">Logout</NavItem>
        }else{
            page = <NavItem onClick={this.onLogin.bind(this)} href= "#">Login</NavItem>
        }

        return(
            <Navbar>
                <Navbar.Brand>
            Github Searcher
          </Navbar.Brand>
          <Nav>
            {page}
        </Nav>
          </Navbar>

        ) ;
    }
}

export default Headers;