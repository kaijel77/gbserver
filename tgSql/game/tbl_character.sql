DROP TABLE `im_game`.`tbl_character`;

CREATE TABLE `im_game`.`tbl_character` (
  `char_no` bigint NOT NULL AUTO_INCREMENT,
  `char_name` varchar(20) DEFAULT NULL,
  `account_no` bigint DEFAULT NULL,
  `char_level` int DEFAULT 1,
  `char_exp` bigint DEFAULT 0,
  `tutorial_clear` bool DEFAULT false,
  `last_access_date` datetime DEFAULT now(), 
  `create_date` datetime DEFAULT now(),
  PRIMARY KEY (`char_no`),
  UNIQUE KEY `index_unique_char_name` (`char_name`),
  KEY `index_account_no` (`account_no`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
