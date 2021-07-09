<?php


namespace AuthPage;


class UserAuth
{
    public function __construct($db=false)
    {
        $this->connection = $db;
    }

    public function getData(array $arr)
    {
        if (!empty($arr))
        {
            foreach ($arr as $key => &$item)
            {
                $item = trim($item);
                if (!strlen($item) && $key != 'message')
                {
                    $this->sendResponse(['err' => 'Все обязательные поля должны быть заполнены']);
                    return false;
                }

                if ($key == 'password' && count($arr) > 3)
                    $item = password_hash($item, PASSWORD_BCRYPT, ['cost' => 12]);
            }
        }
        $this->getQuery($arr);
    }

    private function getQuery(array $dbArr)
    {
        if (!count($dbArr))
            return false;
        elseif (count($dbArr) > 3)
        {
            $checkU = $this->checkUser($dbArr['login']);

            if ($checkU)
            {
                $this->sendResponse(['err' => 'Пользователь с логином ' . $dbArr['login'] . ' зарегистрирован в системе']);
                return false;
            }

            $sql = "INSERT INTO `users`
                    (`login`, `password`, `descr`, `age`, `date`)
                    VALUES (:login, :pass, :descr, :age, current_timestamp())";

            $query = $this->connection->prepare($sql);
            $query->bindParam(':login', $dbArr['login']);
            $query->bindParam(':pass', $dbArr['password']);
            $query->bindParam(':descr', $dbArr['message']);
            $query->bindParam(':age', intval($dbArr['age']), \PDO::PARAM_INT);

            $res = $query->execute();

            if ($res)
                $this->sendResponse(['success' => 'Все прошло успешно, вы зарегистрированы!']);
            else
                $this->sendResponse(['err' => 'Что-то пошло не так, попробуйте зайти позже']);

        } else
        {
            $sql = "SELECT login, password
                    FROM users
                    WHERE login = :login";

            $query = $this->connection->prepare($sql);
            $query->bindParam(':login', $dbArr['login']);

            $res = $query->execute();

            if ($res)
            {
                $pass = $query->fetch(\PDO::FETCH_ASSOC)['password'];

                if (!$pass)
                    $this->sendResponse(['err' => 'Пользователь ' . $dbArr['login'] . ' не зарегистрирован в системе']);
                else
                {
                    if (password_verify($dbArr['password'], $pass))
                        $this->sendResponse(['success' => 'Авторизация прошла успешно!']);
                    else
                        $this->sendResponse(['err' => 'Указан неверный пароль']);
                }
            }
        }
        $query = null;
        return false;

    }

    private function sendResponse(array $resp)
    {
        if (count($resp))
        {
            $willSend = json_encode($resp, JSON_UNESCAPED_UNICODE);
            echo $willSend;
        }
    }

    private function checkUser(string $login)
    {
        $sql = "SELECT login
                FROM users
                WHERE login = :login";

        $query = $this->connection->prepare($sql);
        $query->bindParam(':login', $login);

        $res = $query->execute();

        if ($res)
        {
            $data = $query->fetch(\PDO::FETCH_ASSOC)['login'];

            if ($data)
                return true;
        }

        return false;
    }

}