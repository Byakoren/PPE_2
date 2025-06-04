#  Application d'Émargement pour les Cours (React Native) 

Une application mobile simple pour l'émargement des étudiants en cours, développée avec React Native dans le cadre de mon projet de BTS SIO SLAM.

##  Introduction

Bonjour !  Je suis étudiant en BTS SIO SLAM, et ce projet est ma première application mobile développée avec React Native. L'objectif est de créer une application pratique pour simplifier l'émargement des étudiants en cours.

Cette application permet :

* ✍️ L'émargement rapide des étudiants.
* Le suivi des présences.
* La gestion des cours.

## ✨ Fonctionnalités

* **Émargement simplifié :** Les étudiants peuvent s'émarger rapidement en utilisant leur smartphone.
* **Suivi des présences :** L'application enregistre les présences pour chaque cours.
* **Gestion des cours :** Les enseignants peuvent gérer les cours et les étudiants associés.
* **Interface utilisateur intuitive :** Une interface simple et facile à utiliser.
* **Stockage des données :** Les données sont stockées localement sur l'appareil (ou via une API si vous en avez implémenté une).

## ️ Technologies Utilisées

* **React Native :** Le framework JavaScript pour le développement d'applications mobiles multiplateformes.
* **JavaScript (ou TypeScript) :** Le langage de programmation.
* **Expo (si utilisé) :** Un framework pour faciliter le développement avec React Native.
* **React Navigation (si utilisé) :** Pour la navigation entre les écrans.
* **React Native Paper (ou autre bibliothèque UI) :** Pour les composants d'interface utilisateur.
* **SQLite (ou autre base de données locale) :** Pour le stockage des données.
* **API (si implémentée) :** Pour la communication avec un serveur distant.

## ⚙️ Installation

1.  **Clonez le dépôt :**

    ```bash
    git clone <URL_du_dépôt>
    ```

2.  **Naviguez vers le répertoire du projet :**

    ```bash
    cd <nom_du_projet>
    ```

3.  **Installez les dépendances :**

    ```bash
    npm install
    ```

    ou

    ```bash
    yarn install
    ```

4.  **Lancez l'application sur un émulateur ou un appareil physique :**

    * **Pour Android :**

        ```bash
        npx react-native run-android
        ```

    * **Pour iOS :**

        ```bash
        npx react-native run-ios
        ```

    * **Avec Expo :**

        ```bash
        npx expo start
        ```

##  Utilisation

* Une fois l'application lancée, les étudiants peuvent s'émarger en utilisant leur smartphone.
* Les enseignants peuvent gérer les cours et les étudiants associés.

##  Ressources d'Apprentissage

Ce projet a été développé en utilisant les ressources suivantes :

* [Documentation React Native](https://reactnative.dev/docs/getting-started)
* [Documentation Expo](https://docs.expo.dev/) 
* [Documentation React Navigation](https://reactnavigation.org/) 
* [Autres ressources en ligne]

##  Contribution

Ce projet est un projet d'apprentissage. Cependant, n'hésitez pas à forker le dépôt et à l'utiliser comme point de départ pour vos propres projets React Native !

##  Licence

Ce projet est open-source et disponible sous la [Licence MIT](https://opensource.org/licenses/MIT).

##  Remerciements

* Merci à mes professeurs et camarades de classe pour leur soutien.

##  À Faire (Améliorations Futures)

* Ajouter l'authentification des utilisateurs.
* Implémenter une API pour la communication avec un serveur distant.
* Améliorer l'interface utilisateur avec une bibliothèque de composants UI.
* Ajouter des tests unitaires et d'intégration.
* Implémenter des fonctionnalités avancées (par exemple, notifications, rapports).

##  Conclusion

Cette application d'émargement est un exemple simple mais efficace de ce qui peut être réalisé avec React Native. J'espère qu'elle sera utile à d'autres étudiants qui apprennent React Native ! Bon codage !  


##  Ajout de la nouvelle fonctionnalité de la page de profil pour tout utilisateur

* Documentation technique :

                                            Fonctionnalités

La page de profil permet à un utilisateur (apprenant ou intervenant) de :

    • Visualiser ses informations personnelles (nom, prénom, email).

    • Voir sa photo de profil (avatar).

    • Modifier sa photo de profil via la galerie d’images du téléphone.

    • Valider l’upload manuellement via un bouton.


                                            API Symfony

GET /api/user/{id}

Récupère les informations du profil utilisateur.

Réponse :

{
  "id": 12,
  "prenom": "Jean",
  "nom": "Dupont",
  "email": "jean.dupont@email.com",
  "avatar": "avatar_664f1234567.jpg",
  "success": true
}

POST /api/user/{id}/upload-avatar

Permet à l’utilisateur de modifier son avatar. Le fichier est uploadé et renommé automatiquement côté serveur.

Requête :

    Format multipart/form-data

    Clé : avatar

    Type : image/*

Réponse en cas de succès :

{
  "success": true,
  "message": "Avatar mis à jour"
}

Réponse en cas d’erreur :

{
  "success": false,
  "message": "Aucun fichier reçu"
}

Le fichier est stocké dans : public/uploads/avatars/

Configuration (dans config/services.yaml) :

parameters:
  avatars_directory: '%kernel.project_dir%/public/uploads/avatars'


                                        Côté React Native

Dépendances utilisées

npx expo install expo-image-picker

                                          Fonctionnement

    Chargement automatique des infos depuis /api/user/{id} dans useEffect.

    Si avatar est défini, il est affiché à partir du chemin ${API_BASE_URL}/uploads/avatars/${avatar}.

    La sélection d’une nouvelle image ouvre la galerie via expo-image-picker.

    L’image est temporairement affichée localement.

    Un bouton “Valider l’avatar” permet d’envoyer l’image vers l’API (format FormData).

                                    Arborescence des fichiers liés

src/
├── screens/
│   └── profil/
│       └── ProfilScreen.tsx
└── assets/
    └── images/
        └── photo_profil.png   (avatar par défaut)


                                            Résultat UX/UI

    Interface épurée avec fond dégradé.

    Avatar centré, modifiable, avec feedback visuel.

    Bouton "Changer la photo" et "Valider l’avatar".

    Affichage en lecture seule des infos essentielles.


* Documentation utilisateur : 

Pour accéder à la page de profil, l'utilisateur doit suivre ses différentes étapes :
    - Vous devez vous connecter à votre compte via la page de login avec vos identifiants ;
    - Une fois sur la page d'accueil il vous suffit de cliquer sur le troisième bouton orange avec écrit Profil dessus ;
    - Une fois sur la page de profil vous aurez accès à votre Prénom, Nom et Email, le tout non modifiable depuis cette page, si une faute ou une erreur est présente sur votre profil merci de contacter votre responsable pour en demander la modification ;
    - Vous aurez aussi accès à votre avatar, pour le modifier cliquer sur le texte en dessous "changer l'avatar" vous choisirez alors l'image que vous désirez dans votre galerie, cliquer ensuite sur redimensionner en haut à droite pour passer à la suite si l'image vous convient, un bouton vert "Valider l'avatar" apparaitra ensuite pour permettre à la sauvegarde de l'image dans la Base de données. 

