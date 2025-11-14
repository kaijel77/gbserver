DROP TABLE IF EXISTS `im_game`.`tbl_equipInfo`;

CREATE TABLE `im_game`.`tbl_equipInfo` (
  `equip_no` bigint NOT NULL AUTO_INCREMENT,
  `account_no` bigint NOT NULL,
  `equip_id` int NOT NULL ,
  `equip_type` smallint NOT NULL,
  `equip_star` smallint NOT NULL,
  `equip_grade` int NOT NULL,
  `equip_level` int NOT NULL,
  `equip_exp` bigint NOT NULL,
  `equip_hero` bigint NOT NULL,
  `equip_lock` smallint NOT NULL,
  `end_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `create_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`equip_no`),
  KEY `index_account_no` (`account_no`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
