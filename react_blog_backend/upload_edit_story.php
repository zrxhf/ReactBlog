<?php
/**
 * Created by PhpStorm.
 * User: ruxinzhang
 * Date: 7/4/18
 * Time: 11:29 AM
 */
require 'Config.php';
session_start();
require 'db.php';

if (!$_POST['token'] || !$_SESSION['token'] || !hash_equals($_SESSION['token'], $_POST['token'])) {
    echo "token error";
    // echo "<script>setTimeout(\"location.href = 'home.php';\",1500);</script>";
    exit;
}

$username = $_SESSION['userName'];

if (!$_POST['title'] || !$_POST['content']) {
    echo "missing field";
    //echo "<script>setTimeout(\"location.href = 'home.php';\",1500);</script>";
    exit();
}

if (!isset($_POST['link'])){
    $_POST['link']="/static/media/img_5.257c684b.jpg";
}

if ($_POST['option'] == "create") {

    $stmt = $mysqli->prepare("insert into stories (title, user_id, content, link,tag,privacy) values(? ,? ,? ,? ,?,?)");
    if (!$stmt) {
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }

    $stmt->bind_param('sissss', $_POST['title'], $_SESSION['userId'], $_POST['content'], $_POST['link'], $_POST['tag'], $_POST['privacy']);
    $stmt->execute();
    $stmt->close();
    echo "sucessfully submit story";
    //echo "<script>setTimeout(\"location.href = 'home.php';\",1500);</script>";
} else {
    $news_id = $_POST['storyId'];
    $stmt = $mysqli->prepare("update stories set title=?, user_id=?, content=?, link=?,tag=?, privacy=? where news_id=?");


    if (!$stmt) {
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }

    $stmt->bind_param('sisssss', $_POST['title'], $_SESSION['userId'], $_POST['content'], $_POST['link'], $_POST['tag'], $_POST['privacy'], $_POST['storyId']);
    $stmt->execute();
    $stmt->close();
    echo "sucessfully edit";
    //echo "<script>setTimeout(\"location.href = 'home.php';\",1500);</script>";
}
