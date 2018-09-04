<?php

require 'Config.php';
session_start();
require 'db.php';

if($_POST['option'] === "Delete"){
    if(!$_POST['token'] || !$_SESSION['token']||!hash_equals($_SESSION['token'],$_POST['token'])) {
        echo "token error";
        //header("Location: home.php");
        exit;
    }
    $stmt = $mysqli->prepare("delete from comments where news_id=?");
    if(!$stmt) {
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    $stmt->bind_param('i', $_POST['storyId']);
    $stmt->execute();
    $stmt->close();

    $stmt = $mysqli->prepare("delete from stories where news_id=?");
    if(!$stmt) {
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }

    $stmt->bind_param('i', $_POST['storyId']);
    $stmt->execute();
    $stmt->close();

    echo ("successfully delete the story");
    //header('Location: home.php');
}

