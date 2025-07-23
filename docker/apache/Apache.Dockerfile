FROM composer:lts as dev-deps

WORKDIR /app

COPY ./backend/pbck /app/

RUN composer install --no-interaction --no-dev --prefer-dist \
    && composer clear-cache

# Stage 2: Final application image
FROM php:8.2-apache

RUN docker-php-ext-install pdo pdo_mysql

COPY ./backend/pbck /var/www/html

RUN mv "$PHP_INI_DIR/php.ini-development" "$PHP_INI_DIR/php.ini"

COPY --from=dev-deps /app/vendor /var/www/html/vendor