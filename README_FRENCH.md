
# Vanguard Industries Terminal

Un terminal web interactif pour **Vanguard Industries** avec des fonctionnalités de gestion de fichiers réels. Ce projet utilise **Node.js** et **Express** pour simuler un terminal de commande permettant de créer, éditer, supprimer et lister des fichiers dans un dossier `data`.

## Fonctionnalités

- **Commandes disponibles** :
  - `help`: Affiche une liste des commandes disponibles.
  - `about`: Affiche des informations sur le terminal.
  - `clear`: Efface l'écran du terminal.
  - `pwd`: Affiche le répertoire courant (simulé comme `/data`).
  - `echo [text]`: Affiche le texte fourni.
  - `touch [filename]`: Crée un fichier vide dans le dossier `data`.
  - `edit [filename]`: Modifie le contenu d'un fichier dans le dossier `data`.
  - `rm [filename]`: Supprime un fichier du dossier `data`.
  - `ls`: Liste les fichiers dans le dossier `data`.
  - `cat [filename]`: Affiche le contenu d’un fichier dans le dossier `data`.

## Prérequis

Avant de commencer, vous devez avoir **Node.js** installé sur votre machine.

1. Télécharger et installer Node.js depuis [nodejs.org](https://nodejs.org/).
2. Vérifiez l'installation :
   ```bash
   node -v
   npm -v
   ```

## Installation

### Étape 1 : Cloner le repository

Clonez le repository sur votre machine locale :

```bash
git clone https://github.com/BENZOOgataga/VanguardTerminal.git
cd VanguardTerminal
```

### Étape 2 : Installer les dépendances

Installez les dépendances nécessaires avec `npm` :

```bash
npm install
```

### Étape 3 : Lancer le serveur

Lancez le serveur avec **Node.js** :

```bash
node server.js
```

Ou, pour utiliser **Nodemon** (qui redémarre automatiquement le serveur lors de modifications de code) :

```bash
npm install -g nodemon
nodemon server.js
```

### Étape 4 : Accéder au terminal

Ouvrez votre navigateur et accédez à [http://localhost:3000](http://localhost:3000). Vous verrez l'interface du terminal où vous pouvez entrer des commandes.

## Utilisation

Une fois le serveur démarré, vous pouvez utiliser les commandes suivantes dans le terminal :

- **`touch [filename]`** : Crée un fichier vide dans le dossier `data`. Exemple : `touch example.txt`.
- **`edit [filename]`** : Modifie le contenu d'un fichier existant dans `data`. Exemple : `edit example.txt`.
- **`rm [filename]`** : Supprime un fichier du dossier `data`. Exemple : `rm example.txt`.
- **`ls`** : Liste les fichiers existants dans le dossier `data`.
- **`cat [filename]`** : Affiche le contenu d'un fichier. Exemple : `cat example.txt`.
- **`pwd`** : Affiche le répertoire courant (`/data`).
- **`echo [text]`** : Affiche le texte que vous avez fourni. Exemple : `echo Hello, Vanguard!`

## Structure du projet

```
VanguardTerminal/
├── data/               # Contient les fichiers créés/modifiés
├── public/             # Contient les fichiers frontend (HTML, CSS, JS)
│   ├── index.html
│   ├── styles.css
│   ├── script.js
├── server.js           # Serveur Node.js qui gère les requêtes API
├── package.json        # Dépendances et scripts npm
└── package-lock.json
```

## Contribution

1. Forkez le repository.
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature-nouvelle-fonctionnalité`).
3. Faites vos modifications.
4. Commitez les changements (`git commit -am 'Ajout d'une nouvelle fonctionnalité'`).
5. Poussez votre branche (`git push origin feature-nouvelle-fonctionnalité`).
6. Créez une Pull Request.

## License

Ce projet est sous la licence [MIT License](LICENSE).

## Contact

Si vous avez des questions ou des suggestions, n'hésitez pas à ouvrir une **issue** ou à me contacter via GitHub/Discord.
