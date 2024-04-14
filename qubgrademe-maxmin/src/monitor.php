<?php

header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("HTTP/1.1 200 OK");


$str   = @file_get_contents('/proc/uptime');
$number   = floatval($str);

$output = array(
    "date" => date("Y-m-d H:i:s.u"),
    "ServerHealth" => "Ok",
    "uptime" => $number,
);
echo json_encode($output);
exit();
