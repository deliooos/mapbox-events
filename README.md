# mapbox-events

## Projet de gestion d'évènements sur mapbox @ LIDEM

Yo !

Voici mon TP sur la gestion d'évènement via [MapBox](https://www.mapbox.com/) pour LIDEM !

## Lancer le projet

Pour lancer le projet, téléchargez les fichiers puis lancer la commande `npm install` à la racine du projet. Ceci requiert d'avoir Node 16 minimum installé sur votre machine.

Rendez-vous ensuite dans le fichier `app.config.json` puis modifier la clé d'API pour votre propre clé d'API MapBox.

Une fois ceci fait, lancez la commande `npm run start` à la racine du projet. Et voilà !

## Utilisation de l'app

Ce simple gestionnaire d'évènement enregistre les coordonnées de l'endroit où vous cliquez sur la carte MapBox et les inscrit dans les champs équivalents dans le formulaire à droite. Vous devez ensuite remplir les autres champs et cliquer sur "Créer l'évènement".
Vous verrez s'inscrire sur la carte un point, au survol de celui-ci, vous pourrez voir les informations que vous avez renseigné précédemment. Egalement, le point sera de couleur différente selon la date inscrite.
