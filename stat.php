<?php
$connection = require_once $_SERVER["DOCUMENT_ROOT"] . '/config.php';

$sql = "SELECT login, descr, age
                FROM users
                WHERE date >= NOW() - INTERVAL 6 MINUTE
                ORDER BY age ASC";

$query = $connection->query($sql);
$res = $query->fetchAll(\PDO::FETCH_ASSOC);

return $res;


