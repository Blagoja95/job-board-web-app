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

INSERT INTO `posts` VALUES (10000,'Trazi se programer','Stalno zaposlenje','Laktasi','Trazi se programer sa 2 godine iskustva u java i java script tehnologijama','srednja strucna sprema',293,'2022-12-12 12:22:33'),(12301,'Potreban WEB programer','Remote','Banja Luka','InterPO je u potrazi za strucnim i motivisanim web programerom koji ce se pridruziti na?em timu. Kao web programer u InterPO-u, vasa uloga bice da radite na razvoju i odr?avanju visokokvalitetnih web aplikacija za nase klijente. Va?e zaduzenje ?e obuhvatiti pisanje cistog i efikasnog koda, razumevanje potreba klijenata i kreiranje funkcionalnih i skalabilnih web resenja.','Trazimo osobu koja poseduje iskustvo u programiranju na front-end i/ili back-endu i koja poznaje razlicite tehnologije kao sto su HTML, CSS, JavaScript, PHP i MySQL. Takodje, vazno nam je da imate iskustvo u radu sa razlicitim razvojnim alatima i okvirima kao sto su React, Angular, Vue.js, Laravel, Symfony i slicno.',1123,'2022-08-15 12:33:33'),(3664,'Trazi se Vozac','Puno radno vrijeme','Gradiska','Puno radno vrijeme dostavljac','C1 kategorija',1149,'2023-04-29 00:00:00'),(5848,'Trazi se Graficki dizajner','Remote','Banja Luka',' ...','- dobro poznavanje rada sa Adobe Ilustratorom i Photoshop-om,\n- osnovno poznavanje rada sa ostalim Adobe alatima\n',1149,'2023-04-29 00:00:00');

CREATE TABLE IF NOT EXISTS `users`
(
    `id`       int         DEFAULT NULL,
    `name`     varchar(40) DEFAULT NULL,
    `hashPass` int         DEFAULT NULL,
    `email`    varchar(80) DEFAULT NULL,
    `about`    text,
    `username` varchar(40) DEFAULT NULL,
    `city`     varchar(40) DEFAULT NULL
);

INSERT INTO `users` VALUES (1123,'Tritol doo',-1867378635,'email@tritol.me','Tritol kompanija Banja Luka','tritol22','Banja Luka'),(567,'ProTech',-309012797,'support@protech.com','ProTech kompanija sa centralama ?irom svjeta bavi se razvojom servisa i pruzanja usluga neophodnim za uspje?no poslovanje na?ih partnera','protechbusiness','New York'),(1149,'BestTri',-1867378635,'bestTri@gmail.com','Proizvodnja i servisiranje IT opreme. Nalazimo se u Banjoj Luci. Kontakt telefon 051 555 134','besttri','Banja Luka'),(293,'Longolo',348751414,'me@longolo.com','sdasdasd','longolo','Laktasi'),(1881,'GuitarPro',-1867378635,'info@guitarpro.com','Prodajemo gitare!','guitar22','Banja Luka');