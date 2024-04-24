<?php

$mysqli = new mysqli("localhost", "", "", "customers");

if ($mysqli -> connect_errno) {
    echo "Failed to connect: " . $mysqli -> connection_error;
    exit();
}

$zika = 0;