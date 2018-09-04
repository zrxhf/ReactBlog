import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import Header from './components/Header';
import HomeWrap from './components/HomeWrap'
import Login from './components/Login'
import FavoriteWrap from './components/FavoriteWrap'
import FriendWrap from  './components/FriendWrap'
import DetailWrap from  './components/DetailWrap'
import SignUp from "./components/SignUp";
// ========================================

const Home = (props) => {
    return (
        <div>

            <HomeWrap {...props}/>
        </div>
    )
};


const Favorite = (props) =>{
    return (
        <div>
            <FavoriteWrap {...props}/>
        </div>
    )
};

const Friend = (props) =>{
    return (
        <div>
            <FriendWrap {...props}/>
        </div>
    )
};



const Detail = (props) => {
    return (
        <div>
            <DetailWrap {...props}/>
        </div>
    )
};

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            authUser: null,

        }
    }

    setAuthUser = (authUser) => {
        this.setState({authUser: authUser})
    };


    componentDidMount() {
        const user = localStorage.getItem('user');
        if (user) {
            this.setState({authUser: user})
        }
    }


    render() {
        return (
            <div>
                <Header authUser = {this.state.authUser}/>
                <Route exact path="/" render={(props)=><Home {...props} setAuthUser={this.setAuthUser}/>}/>
                <Route path="/login" render={(props)=><Login {...props} setAuthUser={this.setAuthUser} />}/>
                <Route path="/signup" render={(props)=><SignUp {...props} setAuthUser={this.setAuthUser} />}/>

                <Route path="/favorite" render={(props)=><Favorite {...props}/>}/>
                <Route path="/friend" render={(props)=><Friend {...props}/>}/>
                <Route path="/detail" render={(props)=><Detail {...props}/>}/>

            </div>
        )

    }

}


const Main = withRouter(({props}) => {
    return <App {...props}/>


});


ReactDOM.render(
    <BrowserRouter>
        <Main/>
    </BrowserRouter>,
    document.getElementById('root')
);

registerServiceWorker();


