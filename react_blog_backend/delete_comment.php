<?php
/**
 * Created by PhpStorm.
 * User: ruxinzhang
 * Date: 7/4/18
 * Time: 3:20 PM
 */


require 'Config.php';
session_start();

if(!$_POST['token'] || !$_SESSION['token']||!hash_equals($_SESSION['token'],$_POST['token'])) {
    //header("Location: detail.php?storyId=".$_POST['storyId']);
	exit;
}
require 'db.php';

$commentId = $_POST['commentId'];
$stmt = $mysqli->prepare("delete from comments where comment_id=?");
if(!$stmt) {
    printf("Query Prep Failed: %s\n", $mysqli->error);
    exit;
}
$stmt->bind_param('i',$commentId);
$stmt->execute();
$stmt->close();

//header("Location: detail.php?storyId=".$_POST['storyId']);

