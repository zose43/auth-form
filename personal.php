<?php
$data = require_once $_SERVER['DOCUMENT_ROOT'] . '/stat.php';
$i = 0;
?>
<!DOCTYPE html>
<html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>Статистика</title>
        <link rel="stylesheet" href="/vendor/twbs/bootstrap/dist/css/bootstrap-grid.min.css">
        <link rel="stylesheet" href="/vendor/twbs/bootstrap/dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="/css/style.css">
    </head>
    <body>
        <div class="container">
            <div class="row">
                <div class="col">
                    <div class="title h2 text-center mt-3">Статистика</div>
                </div>
                <table class="table mt-2 table-hover">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Логин</th>
                        <th scope="col">Возраст</th>
                        <th scope="col">Описание</th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php foreach ($data as $user): $i++; ?>
                        <tr>
                            <th scope="row"><?=$i ?></th>
                            <td><?=$user['login'] ?></td>
                            <td><?=$user['age'] ?></td>
                            <td><?=$user['descr'] ?></td>
                        </tr>
                    <?php endforeach;?>
                    </tbody>
                </table>
                <div class="mt-3 fs-4">За последние 6 минут зарегистрировано <?=count($data)?> человек.</div>
            </div>
        </div>
    </body>
</html>



