DROP TABLE IF EXISTS `im_game`.`tbl_guildchat`;

CREATE TABLE `im_game`.`tbl_guildchat` (
  `chat_no` BIGINT NOT NULL AUTO_INCREMENT,
  `guild_no` BIGINT NOT NULL,
  `chat_type` INT NOT NULL,
  `chat_message` varchar(100) NOT NULL,
  `account_no` bigint NOT NULL,
  `nick_name` bigint NOT NULL,
  `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  PRIMARY KEY (`chat_no`),
  KEY `index_guildmaster_account_no` (`guild_no`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
