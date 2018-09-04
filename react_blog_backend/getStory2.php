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
require 'checkRelation.php';

//$userId = 1;
//$username = "111";
//$requestPage = 1;

//$_POST['datemin'] = '2018-07-30';
//$_POST['datemax'] = '2018-07-31';
$userId = $_SESSION['userId'];
$username = $_SESSION['userName'];
$requestPage=1;
if (isset($_POST['page'])){
    $requestPage =$_POST['page'];
}


$articles=[];
$pagesize = 3;


if (isset($_POST['username'])){
    $username = $_POST['username'];
}



function savedata($result)
{
    while ($row = $result->fetch_assoc()) {
        global $mysqli,$userId;

        if ($row["privacy"]==="me" && $row["user_id"]!=$userId){
            continue;
        }
        if ($row["privacy"]==="friend" && $row["user_id"]!=$userId && !checkRelation($row["user_id"],$userId)){
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


function getUserId($username){
    global $mysqli;
    $stmt = $mysqli->prepare("select user_id from users where username =?");
    if (!$stmt) {
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    return $row['user_id'];
}
//-----------------------------------

if (isset($_POST['tag'])){
    if ($_POST['tag'] === "All"){
        $stmt = $mysqli->prepare("select news_id from stories where user_id=? ORDER BY news_id DESC");
        $tmp = getUserId($username);
        $stmt->bind_param('i', $tmp);
    } else {
        $stmt = $mysqli->prepare("select news_id from stories where tag=? and user_id=? ORDER BY news_id DESC");
        $tmp = getUserId($username);
        $stmt->bind_param('si', $_POST['tag'],$tmp);
    }

} else if (isset($_POST['datemin']) && isset($_POST['datemax'])){
    $stmt = $mysqli->prepare("select news_id from stories where user_id =? and time>=? and time<? ORDER BY news_id DESC");
    $tmp=getUserId($username);
    $stmt->bind_param('iss', $tmp,$_POST['datemin'],$_POST['datemax']);
} else if (isset($_POST['storyId'])){
    $stmt = $mysqli->prepare("select news_id from stories where news_id =? ORDER BY news_id DESC");
    $stmt->bind_param('i',$_POST['storyId'] );
} else {
    $stmt = $mysqli->prepare("select news_id from stories where user_id =? ORDER BY news_id DESC");
    $tmp = getUserId($username);
    $stmt->bind_param('i',$tmp);
}



if (!$stmt) {
    printf("Query Prep Failed: %s\n", $mysqli->error);
    exit;
}

$stmt->execute();
$result = $stmt->get_result();

while ($row = $result->fetch_assoc()) {
    global $articles;
    $data = getArticles($row["news_id"]);
    if (!is_null($data)) {
        array_push($articles,$data);
    }

}


$pageNumber = ceil(sizeof($articles)/$pagesize);
$articles = array_slice($articles,($requestPage-1)*$pagesize,$pagesize);


$databack = new stdClass();
$databack->userid = $userId;
$databack->articles = $articles;
$databack->pageNumber = $pageNumber;
$databack_json = json_encode($databack);
//ob_end_clean();
echo $databack_json;



