<?php
/**
 * Created by PhpStorm.
 * User: ruxinzhang
 * Date: 4/21/18
 * Time: 8:09 PM
 */
$mysqli = new mysqli('localhost', 'root', '', 'news');
//$mysqli = new mysqli('localhost', 'wustl_inst', 'wustl_pass', 'news');

if($mysqli->connect_errno) {
    printf("Connection Failed");
    exit;
}else {

}
