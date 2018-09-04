<?php
/**
 * Created by PhpStorm.
 * User: ruxinzhang
 * Date: 7/4/18
 * Time: 2:44 PM
 */
require 'Config.php';
session_start();
require 'db.php';
$userid=$_SESSION['userId'];
$comments = array();

if (isset($_POST['storyId'])) {
    $news_id = $_POST['storyId'];
}


function savedata($result) {
    while($row = $result->fetch_assoc()){
        global $comments,$news_id,$mysqli;
        $comment = new stdClass();
        $comment->id = $row["comment_id"];
        $comment->content = $row["content"];
        $comment->news_id = $news_id;
        $comment->user_id = $row["user_id"];


        $stmt2 = $mysqli->prepare("select username from users where user_id = ?");
        $stmt2->bind_param('i', $row["user_id"]);
        $stmt2->execute();

        $stmt2->bind_result($username);
        $stmt2->fetch();
        $comment->username = $username;
        $stmt2->close();
        array_push($comments,$comment);
    }
}
$stmt = $mysqli->prepare("select comment_id, content,user_id from comments where news_id=? ");
if(!$stmt){
    printf("Query prep Failed: %s\n", $mysqli->error);
}
$stmt->bind_param("i", $news_id);
$stmt->execute();
$result = $stmt->get_result();
//$stmt->bind_result($news_id);
savedata($result);

$stmt->close();



$databack=new stdClass();
$databack->userid=$userid;
$databack->comments =$comments;
$databack_json = json_encode($databack);
//ob_end_clean();
echo $databack_json;