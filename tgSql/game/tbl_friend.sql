DROP TABLE IF EXISTS `im_game`.`tbl_friend`;

CREATE TABLE `im_game`.`tbl_friend` (
  `friend_no` bigint NOT NULL,
  `account_no` bigint NOT NULL,
  `create_date` datetime DEFAULT now(), 
  PRIMARY KEY (`friend_no`, `account_no`),
  KEY `index_friend_no` (`friend_no`),
  KEY `index_account_no` (`account_no`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
