<?php
/**
 * Created by PhpStorm.
 * User: ruxinzhang
 * Date: 7/4/18
 * Time: 2:16 PM
 */

require 'Config.php';
require 'db.php';

session_start();
$username=$_SESSION['userName'];
$userid = $_SESSION['userId'];


if (!$_POST['storyId']){
    //header("Location: home.php");
    exit;
}
if (!$_POST['comment']) {
    echo "missing field";
   // echo "<script>setTimeout(\"location.href = 'home.php';\",1500);</script>";
    exit();
}
$story_id=$_POST['storyId'];
$commentcontent=$_POST['comment'];


if(!$_POST['token'] || !$_SESSION['token']||!hash_equals($_SESSION['token'],$_POST['token'])) {
echo "token error";
    //header("Location: detail.php?storyId=".$story_id);
    exit;
}


if ($_POST['commentId']==""){
    $result = $mysqli->prepare("select max(comment_id) from comments");
    $result->execute();
    $result->bind_result($comment_id);
    $result->fetch();
    if ($comment_id!="") {
        $comment_id = $comment_id +1;
    } else {
        $comment_id = 1;
    }

    $result->close();

    $stmt = $mysqli->prepare("insert into comments (user_id,news_id,comment_id, content) values(? ,?,? ,?)");

    if (!$stmt) {
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }

    //echo $userid,$story_id,$content;
    $stmt->bind_param('iiis', $userid, $story_id,$comment_id,$commentcontent);
    $stmt->execute();
    $stmt->close();
    echo "sucessful";
    //header("Location: detail.php?storyId=".$story_id);
} else{
    $comment_id=$_POST['commentId'];
    $stmt = $mysqli->prepare("update comments set content=?   where comment_id=?");
    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    $stmt->bind_param('si', $commentcontent, $comment_id);


    $stmt->execute();
    $stmt->close();

    echo "successful";
//header("Location: detail.php?storyId=".$story_id);
}

