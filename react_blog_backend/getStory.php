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

$userid = $_SESSION['userId'];

//
//$pageSize = 2;
//if (isset($_POST["$pageSize"])){
//    $pageSize = $_POST["$pageSize"];
//}




$stories = array();

function savedata($result)
{
    while ($row = $result->fetch_assoc()) {
        global $stories, $mysqli;
        $story = new stdClass();
        $story->id = $row["news_id"];
        $story->title = $row["title"];
        $story->tag = $row["tag"];
        $story->content = $row["content"];
        $story->userid = $row["user_id"];

        $stmt2 = $mysqli->prepare("select username from users where user_id = ?");
        $stmt2->bind_param('i', $row["user_id"]);
        $stmt2->execute();

        $stmt2->bind_result($username);
        $stmt2->fetch();
        $story->username = $username;
        $stmt2->close();


        $story->link = $row["link"];

        $story->imgLink = "images/demo/logo.jpg";

        array_push($stories, $story);
    }
}




if (isset($_POST['storyId'])) {
    $stmt = $mysqli->prepare("select news_id,title,tag,content,link,user_id from stories where news_id = ?");


    while (!$stmt) {
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }

    $stmt->bind_param('i', $_POST['storyId']);
    $stmt->execute();
    $result = $stmt->get_result();
    savedata($result);
    $stmt->close();
} else if (isset($_POST['username']) && $_POST['username'] != "") {

    $stmt2 = $mysqli->prepare("select user_id from users where username = ?");
    $stmt2->bind_param('s', $_POST['username']);
    $stmt2->execute();

    $stmt2->bind_result($author_id);
    $stmt2->fetch();

    $stmt2->close();


    $stmt = $mysqli->prepare("select news_id,title,tag,content,link,user_id from stories where user_id = ?");


    while (!$stmt) {
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }

    $stmt->bind_param('i', $author_id);
    $stmt->execute();
    $result = $stmt->get_result();
    savedata($result);
    $stmt->close();
} else {

    if (isset($_POST['filter']) && $_POST['filter'] != "" && $_POST['filter'] != "All") {
        if ($_POST['filter'] == 'Music' || $_POST['filter'] == 'Sport' ||$_POST['filter'] == 'Movie') {
            $stmt = $mysqli->prepare("select news_id,title,tag,content,link,user_id from stories where tag=?");
            while (!$stmt) {
                printf("Query Prep Failed: %s\n", $mysqli->error);
                exit;
            }
            $stmt->bind_param('s', $_POST['filter']);
            $stmt->execute();
            $result = $stmt->get_result();
            savedata($result);
            $stmt->close();

        } else if ($_POST['filter'] == 'Others') {
            $stmt = $mysqli->prepare("select news_id,title,tag,content,link,user_id from stories where tag<>? and tag<>?");
            while (!$stmt) {
                printf("Query Prep Failed: %s\n", $mysqli->error);
                exit;
            }
            $tmp1 = "Music";
            $tmp2 = "Sport";
            $tmp3="Movies";
            $stmt->bind_param('ss', $tmp1, $tmp2,$tmp3);
            $stmt->execute();
            $result = $stmt->get_result();
            savedata($result);
            $stmt->close();
        }
    } else {
        $stmt = $mysqli->prepare("select news_id,title,tag,content,link,user_id from stories");
        while (!$stmt) {
            printf("Query Prep Failed: %s\n", $mysqli->error);
            exit;
        }

        $stmt->execute();
        $result = $stmt->get_result();
        savedata($result);
        $stmt->close();
    }
}

$databack = new stdClass();
$databack->userid = $userid;
$databack->stories = $stories;
$databack_json = json_encode($databack);
//ob_end_clean();
echo $databack_json;



