DROP TABLE IF EXISTS `im_game`.`tbl_missionInfo`;

CREATE TABLE `im_game`.`tbl_missionInfo` (
  `account_no` bigint NOT NULL,
  `mission_id` int NOT NULL,
  `mission_type` int NOT NULL,
  `mission_subtype` int NOT NULL,
  `mission_status` int NOT NULL,
  `mission_count` int NOT NULL,
  `mission_curcount` int NOT NULL,
  `mission_reward` int NOT NULL,
  `update_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `create_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`account_no`, `mission_id`),
  KEY `index_account_no` (`account_no`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
