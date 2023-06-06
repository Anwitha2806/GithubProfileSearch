import React, {Component} from 'react';
import Profile from './Components/Profile';
import Searchs from './Components/Searchs';

const api = 'https://api.github.com/users'
class Github extends Component{

    constructor(props){
        super(props)
        this.state = {
            username: '',
            name: '',
            avatar: '',
            repos: '',
            followers: '',
            following: '',
            homeurl : '',
            notfound : ''
        }
    }

    getProfile(username){
        let finalURL = `${api}/${username}`
        fetch(finalURL)
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                username: data.login,
                name: data.name,
                avatar: data.avatar_url,
                repos: data.public_repos,
                followers: data.followers,
                following: data.following,
                homeurl : data.html_url,
                notFound : data.message
            })
        })
        .catch((error) => console.log("There was a problem in fetching data"))
    }
 
    componentDidMount(){
        this.getProfile(this.state.username)
    }

    render(){
        return(
            <div>
                <section id="card">
                    <Searchs searchProfile={this.getProfile.bind(this)}/>
                   <Profile userdata={this.state}/> 
                </section>
            </div>
            
        )

        
    }
}

export default Github;