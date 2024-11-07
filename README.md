# 2048 Challenge

**2048 Challenge** est un projet réalisé pour relever le défi de recréer le célèbre jeu 2048. Ce challenge m'a été proposé par [Melvyn Malherbe](https://melvynx.com/) dans le cadre d'une de ces formations que j'ai suivie, [BeginJavascript](https://codeline.app/cdly/courses/beginjavascript) pour améliorer mes compétences en développement web. Développé avec React et stylisé avec Tailwind CSS, ce projet est également ma toute première application. Il m’a permis de progresser dans plusieurs domaines : design, algorithmes et responsive design. Ce projet constitue une étape importante dans mon apprentissage et m'a offert l'opportunité de mieux comprendre l'intégration entre esthétique et logique dans une application web.

## Lien vers le site

Vous pouvez jouer au jeu en ligne en suivant ce lien : [2048 Challenge](https://2048-challenge-hrodwolfs-projects.vercel.app/)

## Table des matières

- [Le but du Jeu](#le-but-du-jeu)
- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)

---

## Le but du Jeu

Le **but du jeu 2048** est de faire glisser et fusionner des tuiles numérotées sur une grille pour atteindre la tuile **2048**.

### Règles de base

1. La grille est un carré de **4x4** cases.
2. À chaque mouvement (haut, bas, gauche ou droite), toutes les tuiles se déplacent dans la direction choisie.
3. Si deux tuiles de même valeur se rencontrent, elles fusionnent en une nouvelle tuile dont la valeur est la somme des deux.
   - Par exemple, deux tuiles de **2** fusionnent pour créer une tuile de **4**, deux tuiles de **4** pour une tuile de **8**, etc.
4. Après chaque mouvement, une nouvelle tuile de **2** ou **4** apparaît à un emplacement aléatoire sur la grille.

### Objectif

L'objectif est de créer une tuile de **2048** en fusionnant progressivement les tuiles.

### Fin de la partie

- Le joueur gagne en obtenant la tuile de **2048**.
- La partie se termine si la grille est pleine et qu’aucun mouvement supplémentaire n’est possible (plus aucune fusion possible).

> **Astuce** : Le jeu est basé sur des mouvements stratégiques pour maximiser les chances de fusion et éviter de remplir la grille trop rapidement.

## Fonctionnalités

- **Effets de style** : Les cellules changent de couleur et donne l'impression de s'empiler en fonction de leur valeur.
- **Interface personnalisée** : Couleurs, ombrages, et disposition uniques pour une expérience visuelle distincte.
- **Enregistrement des scores** : Enregistrement du score maximal pour chaque session.
- **Photographier l'instant** : Permet de capturer l'instant où le jeu est terminé avec une capture d'écran.

## Technologies utilisées

- **React** : Pour construire l’interface utilisateur.
- **JavaScript** : Gère la logique du jeu, y compris le mouvement des tuiles, la fusion des tuiles et le calcul des scores.
- **Tailwind CSS** : Pour la mise en page et le styles des composants.
