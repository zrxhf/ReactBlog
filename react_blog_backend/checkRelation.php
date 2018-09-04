<?php
/**
 * Created by PhpStorm.
 * User: ruxinzhang
 * Date: 7/30/18
 * Time: 7:41 AM
 */

require 'db.php';
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