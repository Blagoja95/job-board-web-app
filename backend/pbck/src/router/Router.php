<?php

namespace pbck;

class Router
{
    private array $routes = [];

    public function get(string $path, callable|array $cb): void
    {
        $this->routes['GET'][$path] = $cb;
    }

    public function post(string $path, callable|array $cb): void
    {
        $this->routes['POST'][$path] = $cb;
    }

    public function put(string $path, callable|array $cb): void
    {
        $this->routes['PUT'][$path] = $cb;
    }

    public function delete(string $path, callable|array $cb): void
    {
        $this->routes['DELETE'][$path] = $cb;
    }

    public function resolve(): callable
    {
        $method = $_SERVER['REQUEST_METHOD'];
        $path = $_SERVER['REQUEST_URI'] ?? '/';
        $path = explode('?', $path)[0];

        $cb = $this->routes[$method][$path] ?? null;

        if ($cb === null) {
            http_response_code(404);
            return "404 Not Found";
        }

        if (is_array($cb)) {
            [$class, $method] = $cb;
            $controller = new $class();
            return $controller->$method();
        }
            // TODO
        return $cb();
    }
}