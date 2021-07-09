<?php

use AuthPage\UserAuth;
require_once $_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php';

$data = $_POST['auth'];
$config =  require_once 'config.php';


$uAuth = new UserAuth($config);
$uAuth->getData($data);
