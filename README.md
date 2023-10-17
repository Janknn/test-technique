### Contexte

Lors d'un chantier, les entreprises réalisant les travaux établissent des documents appelés "documents d'exécution" (ex: plans, notes de calcul, fiches produit, planning, ...).

Ces documents d'exécutions sont diffusés à la maîtrise d'oeuvre, composée d'intervenants tels que l'Architecte, les bureaux d'études, les contrôleurs techniques, etc.

Ces derniers ont pour mission d'émettre des avis sur les documents afin de valider les choix des entreprises et d'assurer la cohérence du projet.

Ces avis sont appelés "visas" et chaque intervenant dispose d'un délai contractuel pour émettre ses visas sur les documents.

### Objectif

L'objectif de l'exercice est d'implementer la méthode `StatService.compute()`. Celle-ci prend en entrée une liste de visas (`IVisa[]`) et une date (`Date`) et renvoi pour **chaque visa en retard** un objet contenant le `document` et la `validation` concernés, ainsi que le nombre de jour de retard (`lateness`). La liste retournée devra être triée selon les retards dans l'ordre décroissant.

Cette méthode est exposée sur le endpoint `POST localhost:3000/api/visas/stats?date=0000-00-00T00:00:00.000Z` et doit renvoyer un résultat correct à l'issue de l'exercice au lieu de l'erreur `"Not yet implemented"`.

*note : Le endpoint `GET localhost:3000/api/visas/examples?quantity=000` vous permettra de génerer des jeux de données tests.*

### Règles de calcul des retards

Un visa ayant été émis (`pseudo-code: visa.doneAt !== undefined`) n'est plus considéré comme en retard.

Un visa est considéré comme en retard à partir du moment où `pseudo-code: day(Date.now()) > day(visa.at + visa.timeLimit)`.

Il est demandé de calculer les retards en jours, arrondi au jour inférieur.
