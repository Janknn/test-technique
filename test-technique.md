### Contexte

Lors d'un chantier, les entreprises réalisant les travaux établissent des documents appelés "documents d'exécution" (ex: plans, notes de calcul, fiches produit, planning, ...).

Ces documents d'exécutions sont diffusés à la maîtrise d'oeuvre, composée d'intervenants tels que l'Architecte, les bureaux d'études, les contrôleurs techniques, etc.

Ces derniers ont pour mission d'émettre des avis sur les documents afin de valider les choix des entreprises et la cohérence du projet avec ce qui a été conçu en amont.

Ces avis sont appelés "visas" et chaque intervenant dispose d'un délai contractuel pour émettre ses visas sur les documents.

### Objectif

L'objectif de l'exercice est de faire une API disposant d'un endpoint acceptant une liste de visas et retournant la liste des ids de ceux en retard, accompagnés du nb de jours de retard pour chaque visa.

Le endpoint sera un POST sur la route `/api/visas?from=0000-00-00T00:00:00.000Z` acceptant de la donnée au format json suivant :

```typescript
type VisaList = {
  id: string; // id du visa
  documentId: string; // id du document sur lequel l'avis doit être prononcé. Plusieurs visas peuvent être demandés sur un même document.
  validation: string; // code de la validation demandée. Un seul visa par validation peut être demandé sur un même document.
  timeLimit: number; // délai accordé à l'intervenant pour réaliser le visa. Au-delà le visa est considéré comme en retard
  previous: string[]; // liste des validations devant être réalisées avant celle-ci.
  at: string; // date d'origine de la demande de visa
  doneAt?: string; // date à laquelle le visa a été émis
}[];
```

Il devra être possible de fournir une date dans le paramètre `query.from` pour que le endpoint réalise les calculs par rapport à cette date. En l'absence de cette date, le endpoint utilisera `new Date()` comme valeur par défaut

Ce endpoint doit retourner une réponse au format json suivant :

```typescript
type LateVisaList = {
  visaId: string; // id du visa
  lateness: number; // nombre de jour de retard
}[];
```

Cette réponse devra être triée du visa le plus en retard au moins en retard.

### Règles de calcul des retards

Un visa ayant été émis (`pseudo-code: visa.doneAt !== undefined`) n'est plus considéré comme en retard.

Un visa n'ayant pas de prédécesseurs (`pseudo-code: visa.previous.length === 0`) est considéré comme en retard à partir du moment où `pseudo-code: day(Date.now()) > day(visa.at + visa.timeLimit)`.

Lorsqu'un visa a des prédécesseurs, il faut partir de leur date d'émission (`doneAt`) lorsque celle-ci est supérieure à `visa.at`. En effet tant que les prédécesseurs n'ont pas été émis, le délai du visa ne court pas.

*nota : les prédécesseurs doivent être retrouvés dans la liste en retrouvant un visa ayant le même documentId et la validation demandée. En l'absence du visa dans le fichier, le prédécesseur pourra être ignoré*

Lorsqu'un visa a des prédécesseurs non émis, il n'est pas en retard.

### Contraintes

- L'utilisation des frameworks Express et Nest sont autorisés mais pas obligatoire
- Le code pourra être en js ou en ts
- Le serveur doit démarrer en faisant `npm install; npm start` dans le dossier
- Il n'est pas demandé de faire d'authentification, de log, ... l'objectif est d'évaluer la compréhension du sujet, la justesse du résultat et la qualité du code.

*nota : Le fichier `data.json` contient un jeu de données test*
