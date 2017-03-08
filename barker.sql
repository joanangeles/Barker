-- MySQL dump 10.13  Distrib 5.6.31, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: barker
-- ------------------------------------------------------
-- Server version	5.6.31-0ubuntu0.15.10.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tweet`
--

DROP TABLE IF EXISTS `tweet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tweet` (
  `tweetId` int(11) NOT NULL AUTO_INCREMENT,
  `tweetContent` varchar(140) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `numberOfLikes` int(11) NOT NULL DEFAULT '0',
  `authorId` int(11) NOT NULL,
  `parentTweet` int(11) DEFAULT NULL,
  PRIMARY KEY (`tweetId`),
  KEY `tweet_authorId_fk` (`authorId`),
  KEY `tweet_parentTweet_fk` (`parentTweet`),
  CONSTRAINT `tweet_authorId_fk` FOREIGN KEY (`authorId`) REFERENCES `user` (`userId`),
  CONSTRAINT `tweet_parentTweet_fk` FOREIGN KEY (`parentTweet`) REFERENCES `tweet` (`tweetId`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tweet`
--

LOCK TABLES `tweet` WRITE;
/*!40000 ALTER TABLE `tweet` DISABLE KEYS */;
INSERT INTO `tweet` VALUES (6,'JOn','2016-12-06 22:00:02',1,2,NULL),(7,'Nissy','2016-12-06 10:51:20',1,3,NULL),(9,'Bo gum','2016-12-06 10:51:13',1,4,NULL),(10,'Bo gum','2016-12-05 06:03:22',0,4,6),(14,'Bo guddm','2016-12-05 06:03:22',0,4,6),(20,'hello','2016-12-06 09:28:47',0,5,NULL),(21,'Nissy','2016-12-06 22:00:39',0,3,NULL),(23,'Takahiro','2016-12-06 10:17:21',1,3,7),(24,'JOn','2016-12-06 22:00:18',1,3,6),(28,'kkk','2016-12-06 22:00:08',0,1,NULL),(29,'ssdsd','2016-12-06 10:51:58',0,1,28),(30,'dddd','2016-12-06 22:00:43',1,1,21),(31,'nnn','2016-12-06 22:00:23',0,1,NULL),(32,'HSAJHAJSHDJASD','2016-12-06 19:12:49',1,1,31),(34,'ff','2016-12-06 22:00:27',1,1,31),(35,'hhh','2016-12-06 19:15:24',0,1,21),(37,'jjj','2016-12-06 21:59:30',0,1,31),(38,'kk','2016-12-06 21:59:40',0,1,6),(39,'Jon','2016-12-07 01:56:32',0,2,NULL),(40,'dfdf','2016-12-07 01:56:54',0,2,31),(41,'hello world','2016-12-07 02:05:47',0,6,NULL),(42,'Hi po :)','2016-12-07 02:06:02',0,6,41);
/*!40000 ALTER TABLE `tweet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tweetLikes`
--

DROP TABLE IF EXISTS `tweetLikes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tweetLikes` (
  `tweetId` int(11) NOT NULL,
  `likerId` int(11) DEFAULT NULL,
  KEY `likerId` (`likerId`),
  KEY `tweetLikes_ibfk_2` (`tweetId`),
  CONSTRAINT `tweetLikes_ibfk_1` FOREIGN KEY (`likerId`) REFERENCES `user` (`userId`),
  CONSTRAINT `tweetLikes_ibfk_2` FOREIGN KEY (`tweetId`) REFERENCES `tweet` (`tweetId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tweetLikes`
--

LOCK TABLES `tweetLikes` WRITE;
/*!40000 ALTER TABLE `tweetLikes` DISABLE KEYS */;
INSERT INTO `tweetLikes` VALUES (6,3),(23,1),(9,1),(7,1),(32,1),(24,1),(34,1),(30,1);
/*!40000 ALTER TABLE `tweetLikes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `user_username_uk` (`username`),
  UNIQUE KEY `user_email_uk` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'joan angeles','joanangeles','joan','joanangeles03@gmail.com'),(2,'Jon Cozart','joncozart','jon','joncozart@gmail.com'),(3,'Nissy','Nissy','Nissy','nissy@yahoo.com'),(4,'Bo gum','bogum','bogum\n','bogum@yahoo.com'),(5,'Angelica Angeles','angelica','angelica','angelica@gmail.com'),(6,'jarvin','jarvinpogi','jarvin','jarvin@barker.com');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userfollowed`
--

DROP TABLE IF EXISTS `userfollowed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userfollowed` (
  `userId` int(11) NOT NULL,
  `followedId` int(11) NOT NULL,
  KEY `userfollowed_userId_fk` (`userId`),
  KEY `userfollowed_followedId_fk` (`followedId`),
  CONSTRAINT `userfollowed_followedId_fk` FOREIGN KEY (`followedId`) REFERENCES `user` (`userId`),
  CONSTRAINT `userfollowed_userId_fk` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userfollowed`
--

LOCK TABLES `userfollowed` WRITE;
/*!40000 ALTER TABLE `userfollowed` DISABLE KEYS */;
INSERT INTO `userfollowed` VALUES (4,1),(3,1),(3,4),(3,2),(1,2),(2,1),(2,4),(5,2),(1,3),(6,1);
/*!40000 ALTER TABLE `userfollowed` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'barker'
--
/*!50003 DROP PROCEDURE IF EXISTS `deleteBark` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteBark`(in barkId int)
BEGIN
delete from tweetLikes where tweetId in (select tweet.tweetId from tweet where tweet.parentTweet=barkId);
delete from tweetLikes where tweetId=barkId;
delete from tweet where parentTweet=barkId;
delete from tweet where tweetId=barkId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `followUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `followUser`(user int, other int)
begin
if (exists(select * from userfollowed where userfollowed.userId = user and userfollowed.followedId = other)) then delete from userfollowed where userfollowed.userId = user and userfollowed.followedId = other;
else
insert into userfollowed values(user,other);
end if;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `likeTweet` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `likeTweet`(twitid int, likid int)
begin
if (exists(select * from tweetLikes where tweetLikes.tweetId = twitid and tweetLikes.likerId = likid)) then delete from tweetLikes where tweetLikes.tweetId = twitid and tweetLikes.likerId = likid;
else
insert into tweetLikes values(twitid,likid);
end if;
update tweet set numberOfLikes =  (select count(*) from (select * from tweetLikes where tweetLikes.tweetId = twitid)as x ) where tweet.tweetId = twitid;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-12-07 14:52:50
