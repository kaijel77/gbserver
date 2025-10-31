DROP TABLE IF EXISTS `im_game`.`tbl_guild`;

CREATE TABLE `im_game`.`tbl_guild` (
  `guild_no` bigint NOT NULL AUTO_INCREMENT,
  `guild_name` varchar(21) NOT NULL,
  `guild_message` varchar(100) NOT NULL,
  `guild_isautujoin` bool DEFAULT false,
  `guild_joinlimitlevel` int DEFAULT 0,
  `guildmaster_no` bigint NOT NULL,
  `guildmaster_name` bigint NOT NULL,
  `guild_level` varchar(100) DEFAULT 1,  
  `guild_exp` varchar(100) DEFAULT 0,  
  `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  PRIMARY KEY (`guild_no`),
  KEY `index_guildmaster_account_no` (`guildmaster_no`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
