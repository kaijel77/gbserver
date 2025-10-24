DROP TABLE `im_log`.`tbl_log`;

CREATE TABLE `im_log`.`tbl_log` (
  `log_no` bigint NOT NULL AUTO_INCREMENT,
  `char_no` bigint NOT NULL,
  `subject` varchar(100) DEFAULT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `reward_data` datetime DEFAULT now(), 
  `create_date` datetime DEFAULT now(), 
  `is_read` bool DEFAULT false,
  `is_received` bool DEFAULT false,
  `receive_date` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`log_no`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
