DROP TABLE IF EXISTS `im_game`.`tbl_hero`;

CREATE TABLE `im_game`.`tbl_hero` (
  `hero_no` bigint NOT NULL AUTO_INCREMENT,
  `account_no` bigint NOT NULL,
  `hero_id` int NOT NULL,
  `hero_type` smallint NOT NULL,
  `hero_star` smallint NOT NULL,
  `hero_grade` int NOT NULL,
  `hero_level` int NOT NULL,
  `hero_exp` bigint NOT NULL,
  `hero_location` int NOT NULL,
  `hero_task` int NOT NULL,
  `end_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `create_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`hero_no`),
  KEY `index_account_no` (`account_no`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
