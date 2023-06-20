# Gestion de devoir à rendre

## Membres
- RAKOTOASIMBOLA Mihary Lalaina - 24
- RAKOTONAIVO RADO Tiako Sombiniaina - 29
## Vidéo de présentation
[Lien de la vidéo](https://youtu.be/UnUtIInFf6Y)
## Scripts à lancer pour faire marcher
### api
Cloner le repository [https://github.com/melcobie/backend-assignment-lalaina-sombiniaina](https://github.com/melcobie/backend-assignment-lalaina-sombiniaina)
modifier dans server.js de l'api l'uri de mongoDB
```http
npm i
npm start
```

### frontend
Modifier dans **src/environments/environment.ts** la variable server_uri en http://localhost:<port>
```http

npm run build
npm run start
```

## Login
### Admin
email: admin@uca.fr
mdp: mbds

### Eleve test
email: alice@uca.fr, bob@uca.fr
mdp: mbds

## Fonctionnalités
- Login
- Liste des devoirs rendus et non-rendus
    - onScroll pagination
    - +1000 données
- Création d'un devoir
    - Stepper form
- Détails d'un devoir
- Rendre un devoir: 
    - ajouter note
    - drag adn drop non-rendu à rendu
- Modifier un devoir
- Supprimer un devoir
