DROP TABLE IF EXISTS `im_game`.`tbl_mail`;

CREATE TABLE `im_game`.`tbl_mail` (
  `mail_no` bigint NOT NULL AUTO_INCREMENT,
  `sender_no` bigint NOT NULL,
  `sender_name` varchar(30) NOT NULL,
  `subject` varchar(100) DEFAULT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `reward_data` varchar(1000) DEFAULT NULL,
  `is_read` bool DEFAULT false,
  `is_received` bool DEFAULT false,
  `receive_date` datetime DEFAULT now(), 
  `create_date` datetime DEFAULT now(), 
  PRIMARY KEY (`mail_no`),
  KEY `index_account_no` (`account_no`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
