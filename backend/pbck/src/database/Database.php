<?php

namespace database;

use PDO;

class Database
{
    private PDO $connection {
        get {
            return $this->connection;
        }
    }

    public function __construct(string $host, string $port, string $dbName, string $user, string $password)
    {
        try {
            $this->connection = new \PDO(
                "mysql:host=$host;port=$port;dbname=$dbName",
                $user,
                $password);
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }

        if ($this->table === null) {
            throw new \Error("Missing Database table name property!", 404);
        }
    }
}