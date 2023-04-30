-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: jobpostingsdb
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int DEFAULT NULL,
  `title` varchar(120) DEFAULT NULL,
  `type` varchar(120) DEFAULT NULL,
  `city` varchar(120) DEFAULT NULL,
  `about` text,
  `qual` text,
  `companyID` int DEFAULT NULL,
  `date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (10000,'Trazi se programer','Stalno zaposlenje','Laktasi','Trazi se programer sa 2 godine iskustva u java i java script tehnologijama','srednja strucna sprema',293,'2022-12-12 12:22:33'),(12301,'Potreban WEB programer','Remote','Banja Luka','InterPO je u potrazi za strucnim i motivisanim web programerom koji ce se pridruziti na?em timu. Kao web programer u InterPO-u, vasa uloga bice da radite na razvoju i odr?avanju visokokvalitetnih web aplikacija za nase klijente. Va?e zaduzenje ?e obuhvatiti pisanje cistog i efikasnog koda, razumevanje potreba klijenata i kreiranje funkcionalnih i skalabilnih web resenja.','Trazimo osobu koja poseduje iskustvo u programiranju na front-end i/ili back-endu i koja poznaje razlicite tehnologije kao sto su HTML, CSS, JavaScript, PHP i MySQL. Takodje, vazno nam je da imate iskustvo u radu sa razlicitim razvojnim alatima i okvirima kao sto su React, Angular, Vue.js, Laravel, Symfony i slicno.',1123,'2022-08-15 12:33:33'),(3664,'Trazi se Vozac','Puno radno vrijeme','Gradiska','Puno radno vrijeme dostavljac','C1 kategorija',1149,'2023-04-29 00:00:00'),(5848,'Trazi se Graficki dizajner','Remote','Banja Luka',' ...','- dobro poznavanje rada sa Adobe Ilustratorom i Photoshop-om,\n- osnovno poznavanje rada sa ostalim Adobe alatima\n',1149,'2023-04-29 00:00:00');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int DEFAULT NULL,
  `name` varchar(40) DEFAULT NULL,
  `hashPass` int DEFAULT NULL,
  `email` varchar(80) DEFAULT NULL,
  `about` text,
  `username` varchar(40) DEFAULT NULL,
  `city` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1123,'Tritol doo',-1867378635,'email@tritol.me','Tritol kompanija Banja Luka','tritol22','Banja Luka'),(567,'ProTech',-309012797,'support@protech.com','ProTech kompanija sa centralama ?irom svjeta bavi se razvojom servisa i pruzanja usluga neophodnim za uspje?no poslovanje na?ih partnera','protechbusiness','New York'),(1149,'BestTri',-1867378635,'bestTri@gmail.com','Proizvodnja i servisiranje IT opreme. Nalazimo se u Banjoj Luci. Kontakt telefon 051 555 134','besttri','Banja Luka'),(293,'Longolo',348751414,'me@longolo.com','sdasdasd','longolo','Laktasi'),(1881,'GuitarPro',-1867378635,'info@guitarpro.com','Prodajemo gitare!','guitar22','Banja Luka');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-30  9:51:13
