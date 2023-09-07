CREATE DATABASE IF NOT EXISTS `jobPostingsDB`;

USE `jobPostingsDB`;

CREATE TABLE IF NOT EXISTS `posts`
(
    `id`        int          DEFAULT NULL,
    `title`     varchar(120) DEFAULT NULL,
    `type`      varchar(120) DEFAULT NULL,
    `city`      varchar(120) DEFAULT NULL,
    `about`     text,
    `qual`      text,
    `companyID` int          DEFAULT NULL,
    `date`      datetime     DEFAULT NULL
);

INSERT INTO `posts` VALUES (10000,'Trazi se programer','Stalno zaposlenje','New York','Trazi se programer sa 2 godine iskustva u java i java script tehnologijama','srednja strucna sprema',559,'2022-12-12 12:22:33'),(12301,'Potreban WEB programer','Remote','Banja Luka','Tritol doo je u potrazi za strucnim i motivisanim web programerom koji ce se pridruziti nasem timu. Kao web programer u Tritol-u, vasa uloga bice da radite na razvoju i odrzavanju visokokvalitetnih web aplikacija za nase klijente. Vase zaduzenje ce obuhvatiti pisanje cistog i efikasnog koda, razumevanje potreba klijenata i kreiranje funkcionalnih i skalabilnih web resenja.','Trazimo osobu koja poseduje iskustvo u programiranju na front-end i/ili back-endu i koja poznaje razlicite tehnologije kao sto su HTML, CSS, JavaScript, PHP i MySQL. Takodje, vazno nam je da imate iskustvo u radu sa razlicitim razvojnim alatima i okvirima kao sto su React, Angular, Vue.js, Laravel, Symfony i slicno.',641,'2022-08-15 12:33:33'),(3664,'Trazi se Vozac','Puno radno vrijeme','Gradiska','Puno radno vrijeme dostavljac','C1 kategorija',1418,'2023-04-29 00:00:00'),(5848,'Trazi se Graficki dizajner','Remote','Banja Luka',' ...','- dobro poznavanje rada sa Adobe Ilustratorom i Photoshop-om,\n- osnovno poznavanje rada sa ostalim Adobe alatima\n',1418,'2023-04-29 00:00:00');

CREATE TABLE IF NOT EXISTS `users`
(
    `id`       int         DEFAULT NULL,
    `name`     varchar(40) DEFAULT NULL,
    `hashPass` varchar(72) DEFAULT NULL,
    `email`    varchar(80) DEFAULT NULL,
    `about`    text,
    `username` varchar(40) DEFAULT NULL,
    `city`     varchar(40) DEFAULT NULL
);

INSERT INTO `users` VALUES (641,'Tritol doo','$2a$12$S.zH9ZMXX6tz/vHWXg2TlONq53H7IY7CjSK5p2jGFA.Zi8JRADaaK','email@tritol.me','Tritol kompanija Banja Luka','tritol22','Banja Luka'),(559,'ProTech','$2a$12$8DiD6RWJfLkQa0lT1tro0Oac6mO1oMg3hQyCC0zb6GYUJHkAwzbg2','support@protech.com','ProTech kompanija sa centralama sirom svjeta bavi se razvojom servisa i pruzanja usluga neophodnim za uspjesno poslovanje nasih partnera','protechbusiness','New York'),(1418,'BestTri doo','$2a$12$eyBd7JPglQhHnmkU494zXug877R/D6ysjL53u13bKVISmVuxIb.a.','bestTri@gmail.com','Proizvodnja i servisiranje IT opreme. Kontakt telefon 051 555 134','besttri','Banja Luka'),(386,'GuitarPro s.p.','$2a$12$lPaayplf4EhD2Z5oE37gzuQZ/z0JBsZpiL/HR9rxP3Y1lVe9WdLTq','info@guitarpro.com','Prodajemo gitare!','guitar22','Banja Luka');