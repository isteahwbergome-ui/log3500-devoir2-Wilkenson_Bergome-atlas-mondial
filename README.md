# Atlas Mondial Interactif

Projet réalisé dans le cadre du **Devoir 2** du cours **LOG3500 — Conception et
programmation de sites Web I** (ISTEAH, Été 2026).

## Description

Application web responsive qui permet à l'utilisateur de rechercher un pays
par son nom et d'afficher automatiquement une fiche d'identité générée à
partir de données récupérées en temps réel sur une API publique.

## API utilisée

- **REST Countries API v5** (mise à jour suite à la dépréciation de la v3.1)
  `https://api.restcountries.com/countries/v5?q={nom_du_pays}`
- Authentification requise via un compte développeur et une clé API
  (`Authorization: Bearer <clé>`)
 NOTE; j'ai utilise une vraie cle API lors du developpement

## Fonctionnalités

- Formulaire de recherche avec validation et gestion de l'accessibilité
  (`aria-invalid`, `aria-describedby`).
- Indicateur de chargement pendant l'appel réseau.
- Affichage du drapeau, du nom, de la capitale, de la population (formatée),
  de la région, de la monnaie et des langues du pays trouvé.
- Gestion des erreurs : aucun résultat trouvé, ou connexion réseau
  impossible.
- Mise en page responsive (Flexbox + Media Queries) adaptée aux
  smartphones, tablettes et ordinateurs.

## Structure du projet

```
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
└── README.md
```

## Validation W3C

Le HTML et le CSS ont été validés via :
- https://validator.w3.org/
- https://jigsaw.w3.org/css-validator/

Le rapport des erreurs initiales et des captures d'écran de conformité
finale est joint dans le PDF remis sur Moodle.

## Auteur

Devoir realise par Wiilkenson BERGOME — LOG3500, Été 2026.
