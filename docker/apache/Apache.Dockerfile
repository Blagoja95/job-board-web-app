FROM composer:lts as dev-deps

WORKDIR /app

RUN --mount=type=bind,source=./backend/pbck/composer.json,target=composer.json \
    --mount=type=bind,source=./backend/pbck/composer.lock,target=composer.lock \
    --mount=type=cache,target=/tmp/cache \
    composer install --no-interaction

FROM php:8.2-apache

RUN docker-php-ext-install pdo pdo_mysql

COPY ./backend/pbck/src /var/www/html

RUN mv "$PHP_INI_DIR/php.ini-development" "$PHP_INI_DIR/php.ini"

COPY --from=dev-deps app/vendor/ /var/www/html/vendor