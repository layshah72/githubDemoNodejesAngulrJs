-- phpMyAdmin SQL Dump
-- version 3.5.8.2
-- http://www.phpmyadmin.net
--
-- Host: sql212.byethost11.com
-- Generation Time: Oct 30, 2015 at 12:36 PM
-- Server version: 5.6.25-73.1
-- PHP Version: 5.3.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `b11_16815676_funvest`
--

-- --------------------------------------------------------

--
-- Table structure for table `account_details`
--

CREATE TABLE IF NOT EXISTS `account_details` (
  `account_no` int(50) NOT NULL AUTO_INCREMENT,
  `KYC_status` int(50) DEFAULT NULL,
  `ECS_mandate_pending` int(50) DEFAULT NULL,
  PRIMARY KEY (`account_no`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='kyc_status int default 0 COMMENT ''0 is pending, 1 is updated' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `asset_allocation_detailing`
--

CREATE TABLE IF NOT EXISTS `asset_allocation_detailing` (
  `asset_allocation_detailing_id` int(50) NOT NULL AUTO_INCREMENT,
  `sub_asset_type` varchar(50) DEFAULT NULL,
  `weightage` int(50) DEFAULT NULL,
  `portfolio_id` int(50) DEFAULT NULL,
  PRIMARY KEY (`asset_allocation_detailing_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `asset_allocation_overview`
--

CREATE TABLE IF NOT EXISTS `asset_allocation_overview` (
  `asset_allocation_overview_id` int(50) NOT NULL AUTO_INCREMENT,
  `asset_type` varchar(50) DEFAULT NULL,
  `weightage` int(50) DEFAULT NULL,
  `portfolio_id` int(50) DEFAULT NULL,
  PRIMARY KEY (`asset_allocation_overview_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `category_goal_map`
--

CREATE TABLE IF NOT EXISTS `category_goal_map` (
  `category_goal_map_id` int(50) NOT NULL AUTO_INCREMENT,
  `category_id` int(50) DEFAULT NULL,
  `goal_id` int(50) DEFAULT NULL,
  `order` int(50) DEFAULT NULL,
  PRIMARY KEY (`category_goal_map_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=82 ;

--
-- Dumping data for table `category_goal_map`
--

INSERT INTO `category_goal_map` (`category_goal_map_id`, `category_id`, `goal_id`, `order`) VALUES
(1, 1, 1, 1),
(2, 1, 2, 2),
(3, 1, 3, 3),
(4, 1, 4, 4),
(5, 1, 5, 5),
(6, 1, 6, 6),
(7, 1, 7, 7),
(8, 1, 13, 8),
(9, 1, 14, 9),
(10, 2, 2, 1),
(11, 2, 1, 2),
(12, 2, 7, 3),
(13, 2, 3, 4),
(14, 2, 6, 5),
(15, 2, 5, 6),
(16, 2, 8, 7),
(17, 2, 13, 8),
(18, 2, 14, 9),
(19, 3, 7, 1),
(20, 3, 1, 2),
(21, 3, 5, 3),
(22, 3, 9, 4),
(23, 3, 6, 5),
(24, 3, 3, 6),
(25, 3, 8, 7),
(26, 3, 13, 8),
(27, 3, 14, 9),
(28, 4, 3, 1),
(29, 4, 5, 2),
(30, 4, 1, 3),
(31, 4, 8, 4),
(32, 4, 7, 5),
(33, 4, 6, 6),
(34, 4, 11, 7),
(35, 4, 13, 8),
(36, 4, 14, 9),
(37, 5, 3, 1),
(38, 5, 1, 2),
(39, 5, 7, 3),
(40, 5, 8, 4),
(41, 5, 5, 5),
(42, 5, 6, 6),
(43, 5, 11, 7),
(44, 5, 13, 8),
(45, 5, 14, 9),
(46, 6, 5, 1),
(47, 6, 7, 2),
(48, 6, 1, 3),
(49, 6, 8, 4),
(50, 6, 6, 5),
(51, 6, 3, 6),
(52, 6, 9, 7),
(53, 6, 13, 8),
(54, 6, 14, 9),
(55, 7, 3, 1),
(56, 7, 12, 2),
(57, 7, 1, 3),
(58, 7, 8, 4),
(59, 7, 7, 5),
(60, 7, 10, 6),
(61, 7, 6, 7),
(62, 7, 13, 8),
(63, 7, 14, 9),
(64, 8, 1, 1),
(65, 8, 12, 2),
(66, 8, 7, 3),
(67, 8, 8, 4),
(68, 8, 3, 5),
(69, 8, 10, 6),
(70, 8, 6, 7),
(71, 8, 13, 8),
(72, 8, 14, 9),
(73, 9, 7, 1),
(74, 9, 12, 2),
(75, 9, 1, 3),
(76, 9, 8, 4),
(77, 9, 3, 5),
(78, 9, 10, 6),
(79, 9, 6, 7),
(80, 9, 13, 8),
(81, 9, 14, 9);

-- --------------------------------------------------------

--
-- Table structure for table `goal_detail`
--

CREATE TABLE IF NOT EXISTS `goal_detail` (
  `goal_detail_id` int(50) NOT NULL AUTO_INCREMENT,
  `goal` varchar(50) DEFAULT NULL,
  `investment` varchar(5) DEFAULT 'Y',
  `loan` varchar(5) DEFAULT 'N',
  `insurance` varchar(5) DEFAULT 'N',
  `image_path` varchar(500) DEFAULT NULL,
  `catchy_line` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`goal_detail_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `GOAL_PREFERENCE_CATEGORY_DETAILS`
--

CREATE TABLE IF NOT EXISTS `GOAL_PREFERENCE_CATEGORY_DETAILS` (
  `category` int(11) DEFAULT NULL,
  `age_lower_bound` decimal(10,2) DEFAULT NULL,
  `age_upper_bound` decimal(10,2) DEFAULT NULL,
  `marital__status` decimal(10,2) DEFAULT NULL,
  `child` decimal(10,2) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `GOAL_PREFERENCE_CATEGORY_DETAILS`
--

INSERT INTO `GOAL_PREFERENCE_CATEGORY_DETAILS` (`category`, `age_lower_bound`, `age_upper_bound`, `marital__status`, `child`) VALUES
(1, '18.00', '28.00', '0.00', '0.00'),
(2, '29.00', '40.00', '0.00', '0.00'),
(3, '41.00', '100.00', '0.00', '0.00'),
(4, '18.00', '28.00', '1.00', '0.00'),
(5, '29.00', '40.00', '1.00', '0.00'),
(6, '41.00', '100.00', '1.00', '0.00'),
(7, '18.00', '28.00', '1.00', '1.00'),
(8, '29.00', '40.00', '1.00', '1.00'),
(9, '41.00', '100.00', '1.00', '1.00'),
(1, '18.00', '28.00', '0.00', '0.00'),
(2, '29.00', '40.00', '0.00', '0.00'),
(3, '41.00', '100.00', '0.00', '0.00'),
(4, '18.00', '28.00', '1.00', '0.00'),
(5, '29.00', '40.00', '1.00', '0.00'),
(6, '41.00', '100.00', '1.00', '0.00'),
(7, '18.00', '28.00', '1.00', '1.00'),
(8, '29.00', '40.00', '1.00', '1.00'),
(9, '41.00', '100.00', '1.00', '1.00');

-- --------------------------------------------------------

--
-- Table structure for table `goal_preference_category_details`
--

CREATE TABLE IF NOT EXISTS `goal_preference_category_details` (
  `goal_preference_category_details_id` int(50) NOT NULL AUTO_INCREMENT,
  `category` int(50) DEFAULT NULL,
  `age_lower_bound` int(50) DEFAULT NULL,
  `age_upper_bound` int(50) DEFAULT NULL,
  `income_lower_bound` int(50) DEFAULT NULL,
  `income_upper_bound` int(50) DEFAULT NULL,
  `maritial_status` int(50) DEFAULT NULL,
  `children` int(50) DEFAULT '0',
  PRIMARY KEY (`goal_preference_category_details_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `goal_preference_category_details`
--

INSERT INTO `goal_preference_category_details` (`goal_preference_category_details_id`, `category`, `age_lower_bound`, `age_upper_bound`, `income_lower_bound`, `income_upper_bound`, `maritial_status`, `children`) VALUES
(1, 1, 18, 28, 0, 0, 0, 0),
(2, 2, 29, 40, 0, 0, 0, 0),
(3, 3, 41, 100, 0, 0, 0, 0),
(4, 4, 18, 28, 0, 0, 1, 0),
(5, 5, 29, 40, 0, 0, 1, 0),
(6, 6, 41, 100, 0, 0, 1, 0),
(7, 7, 18, 28, 0, 0, 1, 1),
(8, 8, 29, 40, 0, 0, 1, 1),
(9, 9, 41, 100, 0, 0, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `goal_setup`
--

CREATE TABLE IF NOT EXISTS `goal_setup` (
  `goal_setup_id` int(50) NOT NULL AUTO_INCREMENT,
  `goal_id` int(50) DEFAULT NULL,
  `user_id` int(50) DEFAULT NULL,
  `lumpsum` int(50) DEFAULT '0',
  `contribution` int(50) DEFAULT NULL,
  `portfolio_id` int(50) DEFAULT NULL,
  `time_horizon` int(50) DEFAULT NULL,
  `risk_profile` int(50) DEFAULT NULL,
  `status` int(50) DEFAULT NULL,
  PRIMARY KEY (`goal_setup_id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `person_account_mapping`
--

CREATE TABLE IF NOT EXISTS `person_account_mapping` (
  `person_account_mapping_id` int(50) NOT NULL AUTO_INCREMENT,
  `user_id` int(50) DEFAULT NULL,
  `account_no` int(50) DEFAULT NULL,
  PRIMARY KEY (`person_account_mapping_id`),
  KEY `user_id` (`user_id`),
  KEY `account_no` (`account_no`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='map prson and his account' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `portfoliowise_mutual_fund_detail`
--

CREATE TABLE IF NOT EXISTS `portfoliowise_mutual_fund_detail` (
  `portfoliowise_mutual_fund_detail_id` int(50) NOT NULL AUTO_INCREMENT,
  `portfolio_id` int(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `display_name` varchar(50) DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  `weightage` int(50) DEFAULT NULL,
  PRIMARY KEY (`portfoliowise_mutual_fund_detail_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `portfolio_cetagory_id`
--

CREATE TABLE IF NOT EXISTS `portfolio_cetagory_id` (
  `portfolio_category_id` int(50) NOT NULL AUTO_INCREMENT,
  `portfolio_name` varchar(50) DEFAULT NULL,
  `time_horizon_lower_bound` int(50) DEFAULT NULL,
  `time_horizon_upper_bound` int(50) DEFAULT NULL,
  `risk_profile` int(50) DEFAULT NULL,
  `portfolio_id` int(50) DEFAULT NULL,
  PRIMARY KEY (`portfolio_category_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(50) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `email_id` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `user_detail_id` int(50) DEFAULT NULL,
  `photo` text,
  PRIMARY KEY (`user_id`),
  KEY `user_detail_id` (`user_detail_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='user details' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE IF NOT EXISTS `user_details` (
  `user_details_id` int(50) NOT NULL AUTO_INCREMENT,
  `maritial_status` int(50) DEFAULT NULL,
  `have_children` int(50) DEFAULT NULL,
  `age` int(50) DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `annual_income` int(50) DEFAULT NULL,
  `category_id` int(50) DEFAULT NULL,
  PRIMARY KEY (`user_details_id`),
  KEY `category_id` (`category_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='Store details of users' AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
