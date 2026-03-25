-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mer. 25 mars 2026 à 13:25
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
  `date_score` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `scores`
--

INSERT INTO `scores` (`id_score`, `id_user`, `id_image`, `temps`, `erreurs`, `date_score`) VALUES
(7, 1, 1, 120, 2, '2026-02-09 13:16:12'),
(8, 2, 1, 95, 0, '2026-02-09 13:16:12'),
(9, 3, 2, 150, 1, '2026-02-09 13:16:12');

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
(1, 'Yann', 'yann@example.com', 'dummyhash1', '2026-02-09 13:15:47'),
(2, 'Alice', 'alice@example.com', 'dummyhash2', '2026-02-09 13:15:47'),
(3, 'Bob', 'bob@example.com', 'dummyhash3', '2026-02-09 13:15:47'),
(4, 'Toto', 'totolavedette@gmail.com', '$2y$10$6QuJABQ2B2OhVPZP6PgDtOOMQaGVtzcXD3WkmvzWI5dCO5f68BN4q', '2026-03-17 14:07:16'),
(7, 'Totoooo', 'totolavedetteeee@gmail.com', '$2y$10$l4VnvFompaKBlkFY4okl8OZpSu7nWR7sVIgB1CzaNW/slgpU1a0b6', '2026-03-17 14:09:47'),
(8, 'Totooooo', 'totolavedetteeeee@gmail.com', '$2y$10$CJ4X9GgBg7BM9lZcJ5AsGOdhOKvDnsFm3y56uiu/9RZ0daWnfdO4u', '2026-03-17 14:13:23');

--
-- Index pour les tables déchargées
--

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
-- AUTO_INCREMENT pour la table `images`
--
ALTER TABLE `images`
  MODIFY `id_image` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `scores`
--
ALTER TABLE `scores`
  MODIFY `id_score` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

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
