<?php

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

$mysqli = new mysqli("localhost", "root", "", "customers");

if ($mysqli->connect_errno) {
    echo "Failed to connect: " . $mysqli->connection_error;
    exit();
}