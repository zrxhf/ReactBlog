<?php
/**
 * Created by PhpStorm.
 * User: ruxinzhang
 * Date: 7/8/18
 * Time: 8:13 PM
 */
require 'db.php';
function getUserId($username){
    global $mysqli;
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
//echo $userId;
    $stmt->close();
    unset($stmt);
    session_start();


    $_SESSION['userId'] = $userId;
    $_SESSION['userName'] = $username;
    $_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(32));
    echo "Successfully registered";
}
