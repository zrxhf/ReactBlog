<?php
/**
 * Created by PhpStorm.
 * User: ruxinzhang
 * Date: 7/29/18
 * Time: 8:30 PM
 */


require 'Config.php';
session_start();
require 'db.php';
require 'checkRelation.php';
//$_POST['storyId']=6;
$userId = $_SESSION['userId'];
//$userId=1;
$followed = [];
$following = [];
$friend=[];
function getUserName($id)
{
    global $mysqli;
    $stmt = $mysqli->prepare("select username from users where user_id =?");
    if (!$stmt) {
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    return $row['username'];
}
//get follow me
$stmt = $mysqli->prepare("select follow_id from user_follow where followed_id =?");
if (!$stmt) {
    printf("Query Prep Failed: %s\n", $mysqli->error);
    exit;
}
$stmt->bind_param('i', $userId);
$stmt->execute();
$result = $stmt->get_result();
$friendidlist=[];
$followedidlist=[];
$followingidlist=[];
while ($row = $result->fetch_assoc()) {
    global $followed;

    $tmp = new stdClass();
    $tmp->followUserId = $row["follow_id"];
    $tmp->followUserName = getUserName($tmp->followUserId);
    if (checkRelation($row["follow_id"],$userId)){
        array_push($friendidlist,$tmp->followUserId);
        array_push($friend, $tmp);
    } else {
        array_push($followedidlist,$tmp->followUserId);
        array_push($followed, $tmp);
    }



}

//get I follow
$stmt = $mysqli->prepare("select followed_id from user_follow where follow_id =?");
if (!$stmt) {
    printf("Query Prep Failed: %s\n", $mysqli->error);
    exit;
}
$stmt->bind_param('s', $userId);
$stmt->execute();
$result = $stmt->get_result();

while ($row = $result->fetch_assoc()) {
    global $following;
    $tmp = new stdClass();
    $tmp->followedUserId = $row["followed_id"];
    $tmp->followedUserName = getUserName($tmp->followedUserId);
    if (checkRelation($row["followed_id"],$userId)){
        continue;
    } else {
        array_push($followingidlist,$tmp->followedUserId);
        array_push($following, $tmp);
    }
}


//get other User
$stmt = $mysqli->prepare("select user_id from users");
if (!$stmt) {
    printf("Query Prep Failed: %s\n", $mysqli->error);
    exit;
}
$stmt->execute();
$result = $stmt->get_result();
$unlink =[];

while ($row = $result->fetch_assoc()) {
    global $following;
    $tmp = new stdClass();
    $tmp->unlinkUserId = $row["user_id"];
    $tmp->unlinkUserName = getUserName($tmp->unlinkUserId);
    if ($tmp->unlinkUserName!="Guest" && $tmp->unlinkUserId!= $_SESSION['userId']
        && !in_array($row["user_id"],$followingidlist)
        && !in_array($row["user_id"],$friendidlist)
        && !in_array($row["user_id"],$followedidlist)){
        array_push($unlink, $tmp);
    }
}


$databack = new stdClass();
$databack->friend = $friend;
$databack->following = $following;
$databack->followed = $followed;
$databack->unlink = $unlink;

$databack_json = json_encode($databack);
echo $databack_json;