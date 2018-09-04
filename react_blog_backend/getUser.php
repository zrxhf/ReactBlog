<?php
/**
 * Created by PhpStorm.
 * User: ruxinzhang
 * Date: 7/31/18
 * Time: 4:38 PM
 */
require 'Config.php';
session_start();
$user = new stdClass();
$user->userid = $_SESSION['userId'];
$user->username = $_SESSION['userName'];
$user->token = $_SESSION['token'];
$user_json = json_encode($user);
echo($user_json);