const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Chemin du dossier "data"
const dataFolder = path.join(__dirname, 'data');

// Vérifie que le dossier "data" existe, sinon il le crée
if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder);
}

// API pour créer un fichier
app.post('/api/touch', (req, res) => {
    const { filename } = req.body;
    const filePath = path.join(dataFolder, filename);

    if (fs.existsSync(filePath)) {
        return res.status(400).send(`Error: File "${filename}" already exists.`);
    }

    fs.writeFileSync(filePath, '');
    res.send(`File "${filename}" created.`);
});

// API pour éditer un fichier
app.post('/api/edit', (req, res) => {
    const { filename, content } = req.body;
    const filePath = path.join(dataFolder, filename);

    if (!fs.existsSync(filePath)) {
        return res.status(404).send(`Error: File "${filename}" does not exist.`);
    }

    fs.writeFileSync(filePath, content);
    res.send(`File "${filename}" updated.`);
});

// API pour lire un fichier
app.get('/api/cat/:filename', (req, res) => {
    const filePath = path.join(dataFolder, req.params.filename);

    if (!fs.existsSync(filePath)) {
        return res.status(404).send(`Error: File "${req.params.filename}" does not exist.`);
    }

    const content = fs.readFileSync(filePath, 'utf8');
    res.send(content);
});

// API pour supprimer un fichier
app.delete('/api/rm/:filename', (req, res) => {
    const filePath = path.join(dataFolder, req.params.filename);

    if (!fs.existsSync(filePath)) {
        return res.status(404).send(`Error: File "${req.params.filename}" does not exist.`);
    }

    fs.unlinkSync(filePath);
    res.send(`File "${req.params.filename}" deleted.`);
});

// API pour lister les fichiers
app.get('/api/ls', (req, res) => {
    const files = fs.readdirSync(dataFolder);
    res.send(files);
});

// Démarre le serveur
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
