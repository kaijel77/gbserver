DROP TABLE IF EXISTS `im_game`.`tbl_continentStageInfo`;

CREATE TABLE `im_game`.`tbl_continentStageInfo` (
  `account_no` bigint NOT NULL,
  `continent_id` int NOT NULL,
  `stage_id` int NOT NULL,
  `current_continent_id` int NOT NULL,
  `current_stage_id` int NOT NULL,
  `star_score` int NOT NULL,
  `star_list` VARCHAR(20) DEFAULT '',
  `star_reward` int NOT NULL,
  `current_stage` int NOT NULL,
  `update_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `create_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`account_no`, `continent_id`),
  KEY `index_account_no` (`account_no`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
