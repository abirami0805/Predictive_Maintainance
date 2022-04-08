-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 05, 2020 at 12:59 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.0
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Equipment_Failure`
--

-- --------------------------------------------------------

--
-- Table structure for table `equipment_Value`
--

CREATE TABLE `equipment_Value` (
  `id` int(11) NOT NULL,
  `level` varchar(50) NOT NULL,
  `value` varchar(50) NOT NULL,
  `message` varchar(50) NOT NULL,
  `dt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `sensors_data_date` date NOT NULL,
  `sensors_data_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `equipment_Value`
--

INSERT INTO `equipment_Value` (`id`, `level`, `value`, `message`,`dt`, `sensors_data_date`, `sensors_data_time`) VALUES
(1, 'NORMAL', '1', 'Motor is Good','2021-07-14 04:26:28', '2021-07-14 04:26:28', '2021-07-14 04:26:28');

-- --------------------------------------------------------



--
-- Table structure for table `equipment_Value`
--


--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `dt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `mobile` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `dt`, `mobile`) VALUES
(1, 'level', '$2a$10$3qewR2D9ZaK6nVLpz5mKD.2ASbeRTmAme7j/AgHzpt3Y4Y/lTa/ii', '2019-03-15 17:25:26', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `equipment_Value`
--
ALTER TABLE `equipment_Value`
  ADD PRIMARY KEY (`id`);


--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `equipment_Value`
--
ALTER TABLE `equipment_Value`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;


--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
