<?php
/**
 * Created by PhpStorm.
 * User: ruxinzhang
 * Date: 7/8/18
 * Time: 9:00 PM
 */
require 'Config.php';
session_start();
require 'db.php';
require 'updateFav.php';
//$_POST['option']="Cancel Favorite";
//$_POST['storyId']=28;
//$_SESSION['userId']=1;
if ($_POST['option'] === "Favorite") {
    $stmt = $mysqli->prepare("insert into user_like (user_id, news_id) values (?, ?)");
    if (!$stmt) {
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    $stmt->bind_param('ii', $_SESSION['userId'], $_POST['storyId']);
    $stmt->execute();
    $stmt->close();

    updateFav($_POST['storyId'],"add");

} else {
    $stmt = $mysqli->prepare("delete from user_like where user_id=? and news_id=?");
    if (!$stmt) {
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    $stmt->bind_param('ii', $_SESSION['userId'], $_POST['storyId']);
    $stmt->execute();
    $stmt->close();

    updateFav($_POST['storyId'],"remove");
}






