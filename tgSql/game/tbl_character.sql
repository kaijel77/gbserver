DROP TABLE IF EXISTS `im_game`.`tbl_character`;

CREATE TABLE `im_game`.`tbl_character` (
  `account_no` BIGINT NOT NULL,
  `nickname` VARCHAR(20) DEFAULT '',
  `char_type` INT DEFAULT 0,
  `char_level` INT DEFAULT 1,
  `char_exp` BIGINT DEFAULT 0,
  `tutorial_clear` BOOLEAN DEFAULT FALSE,
  `last_access_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `account_no_UNIQUE` (`account_no`),
  UNIQUE KEY `index_unique_nickname` (`nickname`)  
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*
ALTER TABLE `im_game`.`tbl_character`
ADD CONSTRAINT `fk_character_account`
FOREIGN KEY (`account_no`)
REFERENCES `im_game`.`tbl_account` (`account_no`)
ON DELETE CASCADE
ON UPDATE CASCADE;
*/