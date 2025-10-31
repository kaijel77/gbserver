DROP TABLE IF EXISTS `im_game`.`tbl_guildrequest`;

CREATE TABLE `im_game`.`tbl_guildrequest` (
  `account_no` bigint NOT NULL,
  `guild_no` bigint NOT NULL,
  `request_message` varchar(50) NOT NULL,  
  `request_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`account_no`, `guild_no`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
