-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-11-2016 a las 09:23:51
-- Versión del servidor: 10.1.10-MariaDB
-- Versión de PHP: 7.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `datatables`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cargos`
--

CREATE TABLE `cargos` (
  `id` int(11) NOT NULL,
  `cargo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cargos`
--

INSERT INTO `cargos` (`id`, `cargo`) VALUES
(1, 'Accountant'),
(2, 'Chief Executive Officer (CEO)'),
(3, 'Chief Financial Officer (CFO)'),
(4, 'Chief Marketing Officer (CMO)'),
(5, 'Chief Operating Officer (COO)'),
(6, 'Customer Support'),
(7, 'Data Coordinator'),
(8, 'Developer'),
(9, 'Development Lead'),
(10, 'Director'),
(11, 'Financial Controller'),
(12, 'Integration Specialist'),
(13, 'Javascript Developer'),
(14, 'Junior Javascript Developer'),
(15, 'Junior Technical Author'),
(16, 'Marketing Designer'),
(17, 'Office Manager'),
(18, 'Personnel Lead'),
(19, 'Post-Sales support'),
(20, 'Pre-Sales Support'),
(21, 'Regional Director'),
(22, 'Regional Marketing'),
(23, 'Sales Assistant'),
(24, 'Secretary'),
(25, 'Senior Javascript Developer'),
(26, 'Senior Marketing Designer'),
(27, 'Software Engineer'),
(28, 'Support Engineer'),
(29, 'Support Lead'),
(30, 'System Architect'),
(31, 'Systems Administrator'),
(32, 'Team Leader'),
(33, 'Technical Author');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudades`
--

CREATE TABLE `ciudades` (
  `id` int(11) NOT NULL,
  `ciudad` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `ciudades`
--

INSERT INTO `ciudades` (`id`, `ciudad`) VALUES
(1, 'Edinburgh'),
(2, 'London'),
(3, 'New York'),
(4, 'San Francisco'),
(5, 'Sidney'),
(6, 'Singapore'),
(7, 'Tokyo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal`
--

CREATE TABLE `personal` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `id_cargo` int(11) NOT NULL,
  `id_ciudad` int(11) NOT NULL,
  `fecha_de_ingreso` date NOT NULL,
  `salario_bruto_anual` float(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `personal`
--

INSERT INTO `personal` (`id`, `nombre`, `apellido`, `id_cargo`, `id_ciudad`, `fecha_de_ingreso`, `salario_bruto_anual`) VALUES
(1, 'Tiger', 'Nixon', 30, 1, '2011-04-25', 320800.00),
(2, 'Garrett', 'Winters', 1, 7, '2011-07-25', 170750.00),
(3, 'Ashton', 'Cox', 15, 4, '2009-01-12', 86000.00),
(4, 'Cedric', 'Kelly', 25, 1, '2012-03-29', 433060.00),
(5, 'Airi', 'Satou', 1, 7, '2008-11-28', 162700.00),
(6, 'Brielle', 'York', 12, 3, '2012-12-02', 372000.00),
(7, 'Herrod', 'Chandler', 23, 4, '2012-08-06', 137500.00),
(8, 'Rhona', 'Davidson', 12, 7, '2010-10-14', 327900.00),
(9, 'Colleen', 'Hurst', 13, 4, '2009-09-15', 205500.00),
(10, 'Sonya', 'Frost', 27, 1, '2008-12-13', 103600.00),
(11, 'Jena', 'Gaines', 17, 2, '2008-12-19', 90560.00),
(12, 'Quinn', 'Flynn', 29, 1, '2013-03-03', 342000.00),
(13, 'Charde', 'Marshall', 21, 4, '2008-10-16', 470600.00),
(14, 'Haley', 'Kennedy', 26, 2, '2012-12-18', 313500.00),
(15, 'Tatyana', 'Fitzpatrick', 21, 2, '2010-03-17', 385750.00),
(16, 'Michael', 'Silva', 16, 2, '2012-11-27', 198500.00),
(17, 'Paul', 'Byrd', 3, 3, '2010-06-09', 725000.00),
(18, 'Gloria', 'Little', 31, 3, '2009-04-10', 237500.00),
(19, 'Bradley', 'Greer', 27, 2, '2012-10-13', 132000.00),
(20, 'Dai', 'Rios', 18, 1, '2012-09-26', 217500.00),
(21, 'Jenette', 'Caldwell', 9, 3, '2011-09-03', 345000.00),
(22, 'Yuri', 'Berry', 4, 3, '2009-06-25', 675000.00),
(23, 'Caesar', 'Vance', 20, 3, '2011-12-12', 106450.00),
(24, 'Doris', 'Wilder', 23, 5, '2010-09-20', 85600.00),
(25, 'Angelica', 'Ramos', 2, 2, '2009-10-09', 1200000.00),
(26, 'Gavin', 'Joyce', 8, 1, '2010-12-22', 92575.00),
(27, 'Jennifer', 'Chang', 21, 6, '2010-11-14', 357650.00),
(28, 'Brenden', 'Wagner', 27, 4, '2011-06-07', 206850.00),
(29, 'Fiona', 'Green', 5, 4, '2010-03-11', 850000.00),
(30, 'Shou', 'Itou', 22, 7, '2011-08-14', 163000.00),
(31, 'Michelle', 'House', 12, 5, '2011-06-02', 95400.00),
(32, 'Suki', 'Burks', 8, 2, '2009-10-22', 114500.00),
(33, 'Prescott', 'Bartlett', 33, 2, '2011-05-07', 145000.00),
(34, 'Gavin', 'Cortez', 32, 4, '2008-10-26', 235500.00),
(35, 'Martena', 'Mccray', 19, 1, '2011-03-09', 324050.00),
(36, 'Unity', 'Butler', 16, 4, '2009-12-09', 85675.00),
(37, 'Howard', 'Hatfield', 17, 4, '2008-12-16', 164500.00),
(38, 'Hope', 'Fuentes', 24, 4, '2010-02-12', 109850.00),
(39, 'Vivian', 'Harrell', 11, 4, '2009-02-14', 452500.00),
(40, 'Timothy', 'Mooney', 17, 2, '2008-12-11', 136200.00),
(41, 'Jackson', 'Bradshaw', 10, 3, '2008-09-26', 645750.00),
(42, 'Olivia', 'Liang', 28, 6, '2011-02-03', 234500.00),
(43, 'Bruno', 'Nash', 27, 2, '2011-05-03', 163500.00),
(44, 'Sakura', 'Yamamoto', 28, 7, '2009-08-19', 139575.00),
(45, 'Thor', 'Walton', 8, 3, '2013-08-11', 98540.00),
(46, 'Finn', 'Camacho', 28, 4, '2009-07-07', 87500.00),
(47, 'Serge', 'Baldwin', 7, 6, '2012-04-09', 138575.00),
(48, 'Zenaida', 'Frank', 27, 3, '2010-01-04', 125250.00),
(49, 'Zorita', 'Serrano', 27, 4, '2012-06-01', 115000.00),
(50, 'Jennifer', 'Acosta', 14, 1, '2013-02-01', 75650.00),
(51, 'Cara', 'Stevens', 23, 3, '2011-12-06', 145600.00),
(52, 'Hermione', 'Butler', 21, 2, '2011-03-21', 356250.00),
(53, 'Lael', 'Greer', 31, 2, '2009-02-27', 103500.00),
(54, 'Jonas', 'Alexander', 8, 4, '2010-07-14', 86500.00),
(55, 'Shad', 'Decker', 21, 1, '2008-11-13', 183000.00),
(56, 'Michael', 'Bruce', 13, 6, '2011-06-27', 183000.00),
(57, 'Donna', 'Snider', 6, 3, '2011-01-25', 112000.00);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cargos`
--
ALTER TABLE `cargos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `indice_cargo` (`cargo`);

--
-- Indices de la tabla `ciudades`
--
ALTER TABLE `ciudades`
  ADD PRIMARY KEY (`id`);
  ADD UNIQUE KEY `indice_ciudad` (`ciudad`);

--
-- Indices de la tabla `personal`
--
ALTER TABLE `personal`
  ADD PRIMARY KEY (`id`),
  ADD KEY `indice_id_cargo` (`id_cargo`),
  ADD KEY `indice_id_ciudad` (`id_ciudad`) USING BTREE;

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cargos`
--
ALTER TABLE `cargos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
--
-- AUTO_INCREMENT de la tabla `ciudades`
--
ALTER TABLE `ciudades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `personal`
--
ALTER TABLE `personal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
