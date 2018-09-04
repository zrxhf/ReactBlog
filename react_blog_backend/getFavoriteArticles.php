<?php
/**
 * Created by PhpStorm.
 * User: ruxinzhang
 * Date: 7/4/18
 * Time: 10:01 AM
 */
require 'Config.php';
session_start();

require 'db.php';
$userId = $_SESSION['userId'];
//$userId = 1;

$favoriteArticles = array();

function checkRelation($authid,$userid){
    global $mysqli;
    $stmt = $mysqli->prepare("select follow_id from user_follow where followed_id =? and follow_id=?");
    if (!$stmt) {
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    $stmt->bind_param('ii', $authid,$userid);
    $stmt->execute();
    $result = $stmt->get_result();
    if (!$result->fetch_assoc()){
        return false;
    }
    $stmt = $mysqli->prepare("select follow_id from user_follow where followed_id =? and follow_id=?");
    if (!$stmt) {
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    $stmt->bind_param('ii', $userid,$authid);
    $stmt->execute();
    $result = $stmt->get_result();
    if (!$result->fetch_assoc()){
        return false;
    }
    return true;
}


function savedata($result)
{
    while ($row = $result->fetch_assoc()) {
        global $mysqli,$userId;

        if ($row["privacy"]==="me"){
            continue;
        }
        if ($row["privacy"]==="friend" && !checkRelation($row["user_id"],$userId)){
            continue;
        }

        $story = new stdClass();
        $story->id = $row["news_id"];
        $story->title = $row["title"];
        $story->tag = $row["tag"];
        $story->content = $row["content"];
        $story->userid = $row["user_id"];
        $story->privacy = $row["privacy"];
        $story->time = $row["time"];
        $story->favorite = $row["favorite"];
        $stmt2 = $mysqli->prepare("select username from users where user_id = ?");
        $stmt2->bind_param('i', $row["user_id"]);
        $stmt2->execute();

        $stmt2->bind_result($username);
        $stmt2->fetch();
        $story->username = $username;
        $stmt2->close();


        $story->link = $row["link"];

        $story->imgLink = "images/demo/logo.jpg";

        return $story;
    }
}


function getArticles($id){
    global $mysqli;
    //get public
    $stmt = $mysqli->prepare("select favorite,news_id,title,tag,content,link,user_id,privacy,time from stories where news_id = ?");
    while (!$stmt) {
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }

    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $ans = savedata($result);
    $stmt->close();
    return $ans;

}



$stmt = $mysqli->prepare("select news_id from user_like where user_id =?");
if (!$stmt) {
    printf("Query Prep Failed: %s\n", $mysqli->error);
    exit;
}
$stmt->bind_param('i', $userId);
$stmt->execute();
$result = $stmt->get_result();

while ($row = $result->fetch_assoc()) {
    global $favoriteArticles;
    $data = getArticles($row["news_id"]);
    if (!is_null($data)) {
        array_push($favoriteArticles,$data);
    }

}




$databack = new stdClass();
$databack->userid = $userId;
$databack->articles = $favoriteArticles;
$databack_json = json_encode($databack);
//ob_end_clean();
echo $databack_json;



