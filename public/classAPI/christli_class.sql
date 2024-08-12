-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 09, 2023 at 02:44 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `class`
--

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `title` varchar(1000) NOT NULL,
  `content` varchar(6000) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `title`, `content`, `date`) VALUES
(1, 'Does God love all equally?', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, ullam quia dolorum, reprehenderit, quasi maxime voluptates aliquam dolor ab vitae quod earum corporis dicta totam! Vero quia quas quaerat aperiam voluptates explicabo, laudantium ipsum exercitationem inventore quos, illo atque ab possimus. Repellendus autem beatae quos alias rem exercitationem praesentium cum!,, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, ullam quia dolorum, reprehenderit, quasi maxime voluptates aliquam dolor ab vitae quod earum corporis dicta totam! Vero quia quas quaerat aperiam voluptates explicabo, laudantium ipsum exercitationem inventore quos, illo atque ab possimus. Repellendus autem beatae quos alias rem exercitationem praesentium cum! ,, Examples are:  ,, \r\n1. God ,, \r\n2. Jesus ,, \r\n3. men', '2023-12-07'),
(2, 'Christian Life', 'how should we live\r\n,, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, ullam quia dolorum, reprehenderit, quasi maxime voluptates aliquam dolor ab vitae quod earum corporis dicta totam! Vero quia quas quaerat aperiam voluptates explicabo, laudantium ipsum exercitationem inventore quos, illo atque ab possimus. Repellendus autem beatae quos alias rem exercitationem praesentium cum!,, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, ullam quia dolorum, reprehenderit, quasi maxime voluptates aliquam dolor ab vitae quod earum corporis dicta totam! Vero quia quas quaerat aperiam voluptates explicabo, laudantium ipsum exercitationem inventore quos, illo atque ab possimus. Repellendus autem beatae quos alias rem exercitationem praesentium cum! ,, Examples are:  ,, \r\n1. God ,, \r\n2. Jesus ,, \r\n3. men', '2023-12-07');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `name` varchar(1000) NOT NULL,
  `caption` varchar(400) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `name`, `caption`, `date`) VALUES
(7, 'bishopinabuja.jpg', 'Bishop Akanbi in Abuja with Pas. (Dr) & Pas. (Mrs) Joel of Word & Miracle Embassy', '2023-12-07'),
(8, 'betw.jpg', 'Bishop & Pas. (Mrs) Akanbi Taiwo', '2023-12-07'),
(9, 'women.jpg', 'Members of Bishop\'s wife Association', '2023-12-07'),
(10, 'children.jpg', 'Annual Children Campaign', '2023-12-07');

-- --------------------------------------------------------

--
-- Table structure for table `sermons`
--

CREATE TABLE `sermons` (
  `id` int(11) NOT NULL,
  `title` varchar(2000) NOT NULL,
  `preacher` varchar(500) NOT NULL,
  `link` varchar(5000) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sermons`
--

INSERT INTO `sermons` (`id`, `title`, `preacher`, `link`, `date`) VALUES
(204, 'Holy Living', 'Rev Daniel Olubiyi', 'https://facebook.com', '2023-12-14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sermons`
--
ALTER TABLE `sermons`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `sermons`
--
ALTER TABLE `sermons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=205;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
