-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mar. 05 mai 2026 à 12:08
-- Version du serveur : 5.7.24
-- Version de PHP : 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `nonogramme_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `admin`
--

CREATE TABLE `admin` (
  `id_admin` int(11) NOT NULL,
  `nom_admin` varchar(40) NOT NULL,
  `prenom_admin` varchar(40) NOT NULL,
  `email_admin` varchar(100) NOT NULL,
  `mdp_admin` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `admin`
--

INSERT INTO `admin` (`id_admin`, `nom_admin`, `prenom_admin`, `email_admin`, `mdp_admin`) VALUES
(1, 'Martin', 'Guillaume', 'admin@exemple.com', 'password');

-- --------------------------------------------------------

--
-- Structure de la table `images`
--

CREATE TABLE `images` (
  `id_image` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `largeur` int(11) NOT NULL,
  `hauteur` int(11) NOT NULL,
  `grille` text NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `images`
--

INSERT INTO `images` (`id_image`, `nom`, `largeur`, `hauteur`, `grille`, `created_at`) VALUES
(1, 'Image1', 5, 5, '1010101001101010', '2026-02-09 13:16:00'),
(2, 'Image2', 10, 10, '1110001110001110', '2026-02-09 13:16:00');

-- --------------------------------------------------------

--
-- Structure de la table `scores`
--

CREATE TABLE `scores` (
  `id_score` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_image` int(11) NOT NULL,
  `temps` int(11) NOT NULL,
  `erreurs` int(11) DEFAULT '0',
  `date_score` datetime DEFAULT CURRENT_TIMESTAMP,
  `score_final` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `scores`
--

INSERT INTO `scores` (`id_score`, `id_user`, `id_image`, `temps`, `erreurs`, `date_score`, `score_final`) VALUES
(7, 1, 1, 120, 2, '2026-02-09 13:16:12', NULL),
(8, 2, 1, 95, 0, '2026-02-09 13:16:12', NULL),
(9, 3, 2, 150, 1, '2026-02-09 13:16:12', NULL),
(10, 1, 1, 19155, 0, '2026-03-27 10:33:26', 100),
(11, 1, 1, 82556, 0, '2026-03-27 10:50:14', 100),
(12, 1, 1, 22890, 0, '2026-03-27 10:57:06', 100),
(13, 1, 1, 15438, 0, '2026-03-27 11:01:46', 100),
(14, 1, 1, 129879, 0, '2026-03-27 11:05:32', 300),
(15, 1, 1, 17897, 0, '2026-03-27 11:10:41', NULL),
(16, 2, 1, 24173, 0, '2026-03-27 11:13:57', NULL),
(17, 2, 1, 24178, 0, '2026-03-27 11:34:46', 100),
(18, 2, 1, 24, 0, '2026-03-27 11:38:16', 1276),
(19, 2, 1, 113, 0, '2026-03-27 11:40:47', 2475),
(20, 2, 1, 44, 0, '2026-03-27 13:59:30', 1256),
(21, 2, 1, 18, 0, '2026-03-27 17:20:21', 1282),
(22, 2, 1, 1479, 0, '2026-03-27 17:51:37', 100),
(23, 2, 1, 24, 0, '2026-03-27 17:52:52', 1276),
(24, 2, 1, 19, 0, '2026-03-27 17:56:54', 1281),
(25, 2, 1, 27, 0, '2026-03-27 19:12:32', 1273),
(26, 2, 1, 26, 0, '2026-03-27 19:16:34', 1274),
(27, 2, 1, 70324, 0, '2026-03-27 20:05:25', 100),
(28, 2, 1, 105332, 0, '2026-03-27 20:07:26', 300),
(29, 2, 1, 94774, 0, '2026-03-28 00:03:20', 100),
(30, 2, 1, 15636, 0, '2026-03-28 00:04:13', 100),
(31, 2, 1, 16223, 0, '2026-03-28 00:08:09', 100),
(32, 2, 1, 25653, 0, '2026-03-28 00:13:07', 100),
(33, 2, 1, 14, 0, '2026-03-28 00:18:41', 1286),
(34, 2, 1, 20, 0, '2026-03-28 00:21:33', 1280),
(35, 2, 1, 15, 0, '2026-03-28 00:59:20', 1285),
(36, 2, 1, 15, 0, '2026-03-28 00:59:42', 1285),
(37, 2, 1, 951, 0, '2026-03-28 01:15:50', 1496),
(38, 2, 1, 224, 0, '2026-03-28 14:15:48', 1076),
(39, 2, 1, 16, 0, '2026-03-28 14:16:58', 1284),
(40, 1, 1, 34, 0, '2026-04-06 10:15:14', 1266),
(41, 3, 1, 25, 0, '2026-04-07 10:00:49', 1275),
(42, 3, 1, 32, 0, '2026-04-07 10:33:57', 1268),
(43, 3, 1, 119, 0, '2026-04-07 10:38:14', 2462),
(44, 3, 1, 17, 0, '2026-04-07 11:48:07', 1283),
(45, 3, 1, 12, 0, '2026-04-07 12:03:10', 1288),
(46, 3, 1, 17, 0, '2026-04-07 13:27:03', 1283);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `nickname` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id_user`, `nickname`, `email`, `password`, `created_at`) VALUES
(1, 'Yann', 'yann@example.com', '$2y$10$tmqIgd2/oP7esIwDmYZ.Q.w4IdrRR6Y6Gf18zTqjqUjf4ieYJR3SS', '2026-02-09 13:15:47'),
(2, 'Alice', 'alice@example.com', 'dummyhash2', '2026-02-09 13:15:47'),
(3, 'Bob', 'bob@example.com', 'dummyhash3', '2026-02-09 13:15:47'),
(4, 'Toto', 'totolavedette@gmail.com', '$2y$10$6QuJABQ2B2OhVPZP6PgDtOOMQaGVtzcXD3WkmvzWI5dCO5f68BN4q', '2026-03-17 14:07:16'),
(7, 'Totoooo', 'totolavedetteeee@gmail.com', '$2y$10$l4VnvFompaKBlkFY4okl8OZpSu7nWR7sVIgB1CzaNW/slgpU1a0b6', '2026-03-17 14:09:47'),
(8, 'Totooooo', 'totolavedetteeeee@gmail.com', '$2y$10$CJ4X9GgBg7BM9lZcJ5AsGOdhOKvDnsFm3y56uiu/9RZ0daWnfdO4u', '2026-03-17 14:13:23');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_admin`);

--
-- Index pour la table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id_image`);

--
-- Index pour la table `scores`
--
ALTER TABLE `scores`
  ADD PRIMARY KEY (`id_score`),
  ADD KEY `fk_score_user` (`id_user`),
  ADD KEY `fk_score_image` (`id_image`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `username` (`nickname`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `admin`
--
ALTER TABLE `admin`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `images`
--
ALTER TABLE `images`
  MODIFY `id_image` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `scores`
--
ALTER TABLE `scores`
  MODIFY `id_score` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `scores`
--
ALTER TABLE `scores`
  ADD CONSTRAINT `fk_score_image` FOREIGN KEY (`id_image`) REFERENCES `images` (`id_image`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_score_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
