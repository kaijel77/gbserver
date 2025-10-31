DROP TABLE IF EXISTS `im_game`.`tbl_guildmember`;

CREATE TABLE `im_game`.`tbl_guildmember` (
  `account_no` bigint NOT NULL,
  `guild_no` bigint NOT NULL,
  `guild_grade` smallint default 99,
  `join_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`account_no`),
  KEY `index_guild_no` (`guild_no`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
