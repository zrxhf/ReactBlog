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

//$_POST['option']="Unfollow";

if ($_POST['option'] === "Unfollow") {
    $stmt = $mysqli->prepare("delete from user_follow where follow_id=? and followed_id=?");
    if (!$stmt) {
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    $stmt->bind_param('ii', $_SESSION['userId'], $_POST['userid']);
    $stmt->execute();
    $stmt->close();
} else {
    $stmt = $mysqli->prepare("insert into user_follow (follow_id, followed_id) values (?, ?)");
    if (!$stmt) {
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    $stmt->bind_param('ii', $_SESSION['userId'], $_POST['userid']);
    $stmt->execute();
    $stmt->close();
}






