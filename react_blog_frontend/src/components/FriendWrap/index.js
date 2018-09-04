import React from 'react'
import FriendTable from '../FriendTable'
import $ from 'jquery'
import config from '../config'

class FriendWrap extends React.Component {
    constructor() {
        super();
        this.state={
            followMe:null,
            IFollow:null,
            friend:null,
            unlink:null,
        }
    }

    componentWillMount(){
        let save = this;
        $.ajax({
            url: `${config.apiUrl}/getRelation.php`,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            method:"post",
            success: function (databack) {
                console.log(databack);
                save.setState({
                    followMe: JSON.parse(databack).followed,
                    IFollow:JSON.parse(databack).following,
                    friend:JSON.parse(databack).friend,
                    unlink:JSON.parse(databack).unlink

                })
            },
            error: function (databack) {
                console.log(databack);

            }

        })
    }






    render() {
        return (
            <div className="wrapper row2">
                <div id="container" className="clear">
                    <h2> My Friends</h2>
                    <FriendTable {...this.props} friend = {this.state.friend}/>
                    <br/>
                    <br/>
                    <h2> Users I am Following</h2>
                    <FriendTable {...this.props} IFollow = {this.state.IFollow}/>
                    <br/>
                    <br/>
                    <h2> Users Following Me</h2>
                    <FriendTable {...this.props} followMe = {this.state.followMe}/>
                    <br/>
                    <br/>
                    <h2> Other Users</h2>
                    <FriendTable {...this.props} unlink = {this.state.unlink}/>
                </div>
            </div>


        );
    }


}

export default FriendWrap;