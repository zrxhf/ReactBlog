import React from 'react';
import Comment from '../Comment';
class Comments extends React.Component{

    constructor(){
        super()
    }

    render(){
        console.log(this.props.comments);
        let hhh=null;
        if (this.props.comments){
            let comments = JSON.parse(this.props.comments).comments;
            let userid = JSON.parse(this.props.comments).userid;
            hhh =  (comments.map(comment => (
                    <Comment {...this.props} comment={comment} userid={userid}/>
            )));
            console.log("afterupdatecomment", comments);
        }


        return(

            <section id="latest" className="last">
                <h5>Comments:</h5>
                <ul className="comments">
                    {hhh}
                </ul>
            </section>


        )



    }


}
export default Comments;