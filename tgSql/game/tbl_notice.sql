DROP TABLE IF EXISTS `im_game`.`tbl_notice`;

CREATE TABLE `im_game`.`tbl_notice` (
  `notice_no` bigint NOT NULL AUTO_INCREMENT,
  `is_repeat` tinyint NOT NULL,
  `repeat_delay` int NOT NULL,
  `is_reservation` tinyint NOT NULL,
  `reservation_start` datetime NULL,
  `reservation_end` datetime NULL,
  `is_complete` tinyint NOT NULL,
  `content` varchar(500) DEFAULT NULL,
  `create_date` datetime DEFAULT now(), 
  PRIMARY KEY (`notice_no`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
