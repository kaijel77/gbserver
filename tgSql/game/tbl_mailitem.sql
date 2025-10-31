DROP TABLE IF EXISTS `im_game`.`tbl_mailitem`;

CREATE TABLE `im_game`.`tbl_mailitem` (
  `mail_no` bigint NOT NULL,
  `item_id` int NOT NULL,
  `item_count` int NOT NULL,
  `item_level` int NOT NULL,
  `item_grade` int NOT NULL,
  `create_date` datetime DEFAULT now(), 
  KEY `index_mail_no` (`mail_no`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
