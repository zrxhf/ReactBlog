<?php
/**
 * Created by PhpStorm.
 * User: ruxinzhang
 * Date: 7/8/18
 * Time: 9:52 PM
 */
require 'db.php';

function updateFav($storyId, $option)
{
    global $mysqli;
    if ($option === "add") {
        $stmt = $mysqli->prepare("update stories set favorite=favorite+1   where news_id=?");

    } else {
        $stmt = $mysqli->prepare("update stories set favorite=favorite-1   where news_id=?");

    }
    if (!$stmt) {
        printf("prepare register query failed;");

        exit;
    }
    $stmt->bind_param('i', $storyId);
    $stmt->execute();
    $stmt->close();
}
