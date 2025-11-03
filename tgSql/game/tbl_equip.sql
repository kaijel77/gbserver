DROP TABLE IF EXISTS `im_game`.`tbl_equip`;

CREATE TABLE `im_game`.`tbl_equip` (
  `account_no` bigint NOT NULL,
  `equip_no` bigint NOT NULL ,
  `item_no` bigint NOT NULL ,
  `end_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `create_date` datetime DEFAULT CURRENT_TIMESTAMP,
  KEY `index_account_no` (`account_no`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
