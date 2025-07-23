<?php

require_once __DIR__ . '/vendor/autoload.php';

use router\Router;
use database\Database;
$router = new Router();
//$database = new Database();

echo print_r($_ENV);
//$router->get('/', [HomeController::class, 'index']);

//echo $router->resolve();