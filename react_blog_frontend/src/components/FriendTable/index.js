import React from 'react';
import $ from "jquery";
import config from "../config";

class FriendTable extends React.Component{

    constructor(){
        super()
    }


    handleSubmit(event){
        event.preventDefault();
        let data =null;
        if (event.target.value ==="Unfollow"){
             data = {
                userid :event.target.name,
                option: "Unfollow"
            }
        } else {
            data = {
                userid :event.target.name,
                option: "BecomeFriend"
            }
        }
        $.ajax({
            url: `${config.apiUrl}/updateRelationship.php`,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            data:data,
            method:"post",
            success: function (databack) {
                console.log(databack);
                window.location.href = "/friend";
            }
        })
    }



    render(){
        let title = null;
        let hhh = null;
        let Users = null;
        if (this.props.IFollow){
            Users = this.props.IFollow;
            title= "Users I am Following";
            hhh =  (Users.map(user => (

                    <tr className="favorite">
                        <td className="favorite">
                            <a href={"/?username="+user.followedUserName}>{user.followedUserName}</a>
                        </td>
                        {localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).username !=="Guest"?<td className="favorite">
                            <button onClick={this.handleSubmit} type="submit" name={user.followedUserId} value="Unfollow">Unfollow</button>
                        </td>:null}
                    </tr>

            )))




        } else if (this.props.followMe){
            title = "Users I am following"
            Users = this.props.followMe;
            hhh =  (Users.map(user => (
                    <tr className="favorite">
                        <td className="favorite">
                            <a href={"/?username="+user.followUserName}>{user.followUserName}</a>
                        </td>
                        {localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).username !=="Guest"?   <td className="favorite">
                            <button onClick={this.handleSubmit} type="submit" name={user.followUserId} value="Become Friend">Become Friend</button>
                        </td>:null}
                    </tr>

            )))



        } else if (this.props.friend){
            title = "Friend";
            Users = this.props.friend;
            hhh =  (Users.map(user => (
                <tr className="favorite">
                    <td className="favorite">
                        <a href={"/?username="+user.followUserName}>{user.followUserName}</a>
                        </td>
                    {localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).username !=="Guest"?<td className="favorite">
                        <button onClick={this.handleSubmit} type="submit" name={user.followUserId} value="Unfollow">Unfollow</button>
                    </td>:null}
                </tr>

            )))
        } else if (this.props.unlink){
            title = "Other Users";
            Users = this.props.unlink;
            hhh =  (Users.map(user => (
                <tr className="favorite">
                    <td className="favorite">
                        <a href={"/?username="+user.unlinkUserName}>{user.unlinkUserName}</a>
                        </td>
                    {localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).username !=="Guest"?<td className="favorite">
                        <button onClick={this.handleSubmit} type="submit" name={user.unlinkUserId} value="Follow">Follow</button>
                    </td>:null}
                </tr>

            )))
        }





        return (
            <table className="favorite">
                <tbody>
                <tr className="favorite">
                    <th className="favorite">{title}</th>
                    {localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).username !=="Guest"?<th className="favorite">Option</th>:null}
                </tr>

                {hhh}


                </tbody>
            </table>
        )

    }

}
export default FriendTable;



