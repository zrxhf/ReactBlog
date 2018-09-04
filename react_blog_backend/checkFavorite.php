<?php
/**
 * Created by PhpStorm.
 * User: ruxinzhang
 * Date: 7/30/18
 * Time: 7:48 PM
 */
require 'Config.php';
session_start();
require 'db.php';

$userid = $_SESSION['userId'];
$newsid = $_POST['news_id'];

$stmt = $mysqli->prepare("select user_id from user_like where user_id =? and news_id=?");
if (!$stmt) {
    printf("Query Prep Failed: %s\n", $mysqli->error);
    exit;
}
$stmt->bind_param('ii', $userid, $newsid);
$stmt->execute();
$result = $stmt->get_result();
if (!$result->fetch_assoc()) {
    echo "false";
    exit;
}

echo "true";
