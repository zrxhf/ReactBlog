<?php
/**
 * Created by PhpStorm.
 * User: ruxinzhang
 * Date: 7/7/18
 * Time: 8:44 PM
 */
require 'Config.php';
require 'db.php';
//$_POST = json_decode(file_get_contents("php://input"), true);

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

//
//$username = "zrx00192";
//$password = "123";
$hash_psw = -1;

$stmt = $mysqli->prepare("select user_id,password from users where username =?");
if (!$stmt) {
    printf("Query Prep Failed: %s\n", $mysqli->error);
//    echo "<script>setTimeout(\"location.href = 'main.html';\",1500);</script>";

    exit;
}
$stmt->bind_param('s', $username);
$stmt->execute();

$result = $stmt->get_result();
while ($row = $result->fetch_assoc()) {
    $userId = $row["user_id"];
    $hash_psw = $row["password"];
}

if (password_verify($_POST['password'], $hash_psw)) {
    session_start();
    $_SESSION['userId'] = $userId;
    $_SESSION['userName'] = $username;
    $_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(32));
    echo "Successfully logged in";
    exit;
} else {
    echo "Password or username is wrong";
    exit;
}


