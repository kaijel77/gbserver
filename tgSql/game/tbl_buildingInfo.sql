DROP TABLE IF EXISTS `im_game`.`tbl_buildingInfo`;

CREATE TABLE `im_game`.`tbl_buildingInfo` (
  `account_no` bigint NOT NULL,
  `building_id` int NOT NULL,
  `building_type` int NOT NULL,
  `building_level` int NOT NULL,
  `building_status` int NOT NULL,
  `building_endtime` datetime DEFAULT CURRENT_TIMESTAMP,
  `create_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`account_no`, `building_id`),
  KEY `index_account_no` (`account_no`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
