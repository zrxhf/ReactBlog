<?php
/**
 * Created by PhpStorm.
 * User: ruxinzhang
 * Date: 7/8/18
 * Time: 7:10 PM
 */
require 'Config.php';
require 'db.php';
require 'getUserId.php';
if (!$_POST['userName'] || !$_POST['password']) {
    echo "missing filed.";
    exit;
}
//check username
if (!preg_match('/^[\w_\-]+$/', $_POST['userName'])) {
    echo "Invalid username";
    exit;
}

//check password
if (!preg_match('/^[\w_\-]+$/', $_POST['password'])) {
    echo "Invalid password";
    exit;
}

$username = $_POST['userName'];
$psw_hash = password_hash($_POST['password'], PASSWORD_DEFAULT);

$userId = null;

$stmt = $mysqli->prepare("select user_id from users where username =?");
if (!$stmt) {
    printf("Query Prep Failed: %s\n", $mysqli->error);
    exit;
}
$stmt->bind_param('s', $username);
$stmt->execute();
$result = $stmt->get_result();

while ($row = $result->fetch_assoc()) {
    $userId = $row["user_id"];
}
if (!$userId) {

    $stmt = $mysqli->prepare("insert into users (username, password) values (?, ?)");
    if (!$stmt) {
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    $stmt->bind_param('ss', $username, $psw_hash);
    $stmt->execute();
    $stmt->close();
    unset($stmt);
    sleep(1);
    getUserId($username);

} else {
    echo "User already exists";

}










