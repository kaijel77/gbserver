DROP TABLE IF EXISTS `im_game`.`tbl_deckInfo`;

CREATE TABLE `im_game`.`tbl_deckInfo` (
  `account_no` bigint NOT NULL,
  `deck_type` int NOT NULL,
  `deck_hero01` int NOT NULL,
  `deck_hero02` int NOT NULL,
  `deck_hero03` int NOT NULL,
  `deck_hero04` int NOT NULL,
  `deck_hero05` int NOT NULL,
  `deck_hero06` int NOT NULL,
  `deck_hero07` int NOT NULL,
  `deck_hero08` int NOT NULL,
  `update_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `create_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`account_no`, `deck_type`),
  KEY `index_account_no` (`account_no`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
