DROP TABLE IF EXISTS `im_game`.`tbl_item`;

CREATE TABLE `im_game`.`tbl_item` (
  `item_no` bigint NOT NULL AUTO_INCREMENT,
  `account_no` bigint NOT NULL,
  `item_id` int NOT NULL,
  `item_type` smallint NOT NULL,
  `item_count` int NOT NULL,
  `item_grade` int NOT NULL,
  `item_level` int NOT NULL,
  `item_exp` int NOT NULL,
  `end_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `create_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`item_no`),
  KEY `index_account_no` (`account_no`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
