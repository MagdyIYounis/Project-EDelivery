-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 28, 2020 at 11:55 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `edilevary`
--

-- --------------------------------------------------------

--
-- Table structure for table `city`
--

CREATE TABLE `city` (
  `City_ID` int(11) NOT NULL,
  `City_Name` varchar(100) NOT NULL,
  `Info` varchar(150) NOT NULL,
  `CountryID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `city`
--

INSERT INTO `city` (`City_ID`, `City_Name`, `Info`, `CountryID`) VALUES
(1, 'string', 'string', 1),
(2, 'string', 'string', 1),
(3, 'Cairo', 'string', 1);

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE `country` (
  `Country_ID` int(11) NOT NULL,
  `Country_Name` varchar(100) NOT NULL,
  `Info` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `country`
--

INSERT INTO `country` (`Country_ID`, `Country_Name`, `Info`) VALUES
(1, 'Damitta', '');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `Cust_ID` int(11) NOT NULL,
  `Cust_Name` varbinary(100) NOT NULL,
  `District_Number` int(11) DEFAULT NULL,
  `Neighboring_Number` int(11) DEFAULT NULL,
  `Block_Number` int(11) DEFAULT NULL,
  `Floor_Number` int(11) DEFAULT NULL,
  `Flat_Number` int(11) DEFAULT NULL,
  `Info` varbinary(150) DEFAULT NULL,
  `Point` int(11) NOT NULL,
  `CityID` int(11) NOT NULL,
  `Date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`Cust_ID`, `Cust_Name`, `District_Number`, `Neighboring_Number`, `Block_Number`, `Floor_Number`, `Flat_Number`, `Info`, `Point`, `CityID`, `Date`) VALUES
(1, 0x737472696e67, NULL, NULL, NULL, NULL, NULL, 0x737472696e67, 0, 1, '2020-06-10 00:21:34'),
(2, 0x30786b73646e61736461, 1, 1, 1, 1, 1, NULL, 0, 3, '0000-00-00 00:00:00'),
(3, 0xd985d8acd8afd98a, 1, 4, 1, 1, 1, '', 0, 3, '0000-00-00 00:00:00'),
(4, 0xd985d8acd8afd98a, 1, 1, 0, 0, 0, '', 0, 3, '0000-00-00 00:00:00'),
(5, 0xd985d8acd8afd98a, 1, 1, 0, 0, 0, '', 0, 3, '0000-00-00 00:00:00'),
(6, 0xd985d8acd8afd98a, 0, 0, 0, 0, 0, '', 0, 3, '0000-00-00 00:00:00'),
(7, 0xd985d8acd8afd98a, 0, 1, 0, 0, 0, '', 0, 2, '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Stand-in structure for view `customer_v`
-- (See below for the actual view)
--
CREATE TABLE `customer_v` (
`Cust_ID` int(11)
,`Cust_Name` varbinary(100)
,`Details` varchar(156)
,`Info` varbinary(150)
,`Point` int(11)
,`Date` datetime
);

-- --------------------------------------------------------

--
-- Table structure for table `phone_number`
--

CREATE TABLE `phone_number` (
  `ID_Phone` int(11) NOT NULL,
  `Phone_Number` varbinary(45) NOT NULL,
  `customerId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `phone_number`
--

INSERT INTO `phone_number` (`ID_Phone`, `Phone_Number`, `customerId`) VALUES
(4, 0x737472696e67, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `realm` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `emailVerified` tinyint(1) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `realm`, `username`, `email`, `emailVerified`, `password`) VALUES
(3, '', 'Magdy Mazrou', 'Goda494@yahoo.com', 0, '123456');

-- --------------------------------------------------------

--
-- Structure for view `customer_v`
--
DROP TABLE IF EXISTS `customer_v`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `customer_v`  AS  select `customer`.`Cust_ID` AS `Cust_ID`,`customer`.`Cust_Name` AS `Cust_Name`,concat(`city`.`City_Name`,'-',`customer`.`District_Number`,`customer`.`Neighboring_Number`,`customer`.`Block_Number`,`customer`.`Floor_Number`,`customer`.`Flat_Number`) AS `Details`,`customer`.`Info` AS `Info`,`customer`.`Point` AS `Point`,`customer`.`Date` AS `Date` from (`customer` join `city`) where `customer`.`CityID` = `city`.`City_ID` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`City_ID`),
  ADD KEY `CountryID` (`CountryID`);

--
-- Indexes for table `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`Country_ID`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`Cust_ID`),
  ADD KEY `fkIdx_21` (`CityID`);

--
-- Indexes for table `phone_number`
--
ALTER TABLE `phone_number`
  ADD PRIMARY KEY (`ID_Phone`),
  ADD KEY `fkIdx_28` (`customerId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `city`
--
ALTER TABLE `city`
  MODIFY `City_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `country`
--
ALTER TABLE `country`
  MODIFY `Country_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `Cust_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `phone_number`
--
ALTER TABLE `phone_number`
  MODIFY `ID_Phone` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `city`
--
ALTER TABLE `city`
  ADD CONSTRAINT `city_ibfk_1` FOREIGN KEY (`CountryID`) REFERENCES `country` (`Country_ID`);

--
-- Constraints for table `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`CityID`) REFERENCES `city` (`City_ID`);

--
-- Constraints for table `phone_number`
--
ALTER TABLE `phone_number`
  ADD CONSTRAINT `FK_28` FOREIGN KEY (`customerId`) REFERENCES `customer` (`Cust_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
