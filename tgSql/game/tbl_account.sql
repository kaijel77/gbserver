DROP TABLE `im_game`.`tbl_account`;

CREATE TABLE `im_game`.`tbl_account` (
  `account_no` bigint NOT NULL AUTO_INCREMENT,
  `id` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `withdraw_date` datetime DEFAULT now(),
  `withdraw` bool DEFAULT false,
  `block_date` datetime DEFAULT now(),
  `block` bool DEFAULT false,
  `last_access_date` datetime DEFAULT now(), 
  `create_date` datetime DEFAULT now(),
  PRIMARY KEY (`account_no`),
  UNIQUE KEY `index_unique_id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
