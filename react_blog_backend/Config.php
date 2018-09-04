<?php
/**
 * Created by PhpStorm.
 * User: ruxinzhang
 * Date: 7/30/18
 * Time: 8:18 PM
 */
header('Access-Control-Allow-Origin: http://localhost:3000');
//header('Access-Control-Allow-Origin: http://ec2-34-224-218-92.compute-1.amazonaws.com:3000');
header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
