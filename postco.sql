-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 26, 2020 at 11:11 PM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `postco`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `name` varchar(100) NOT NULL,
  `ic` varchar(15) NOT NULL,
  `role` varchar(15) NOT NULL,
  `location` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`name`, `ic`, `role`, `location`) VALUES
('Alex', '734735-23-2323', 'Visitor', ''),
('Jason', '123456-01-7890', 'Visitor', ''),
('Lim wei chern', '990228-01-5969', 'Store Owner', 'Tapir Grocer');

-- --------------------------------------------------------

--
-- Table structure for table `visitors`
--

CREATE TABLE `visitors` (
  `Full_name` varchar(100) NOT NULL,
  `IC_No` varchar(15) NOT NULL,
  `location` varchar(100) NOT NULL,
  `Temperature` float DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `Time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `visitors`
--

INSERT INTO `visitors` (`Full_name`, `IC_No`, `location`, `Temperature`, `Date`, `Time`) VALUES
('Jason', '123456-01-7890', 'Tapir Grocer', 36.6, '2020-11-26', '16:52:27'),
('Jason', '123456-01-7890', 'Tapir Grocer', 37.2, '2020-11-26', '17:07:58'),
('Alex', '734735-23-2323', 'Tapir Grocer', 35.6, '2020-11-26', '17:08:21'),
('Alex', '734735-23-2323', 'Tapir Grocer', 36.6, '2020-11-26', '17:09:08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`name`,`ic`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
