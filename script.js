$(document).ready(function () {
    const $output = $("#output"); // Zone de sortie des résultats
    const $input = $("#commandInput"); // Champ de saisie des commandes

    // Commandes disponibles
    const commands = {
        help: () => {
            return `
                <strong>Available commands:</strong><br>
                <span class="highlight">help</span> - Show this help message<br>
                <span class="highlight">about</span> - Information about Vanguard Industries<br>
                <span class="highlight">clear</span> - Clear the terminal<br>
            `;
        },
        about: () => {
            return `
                <strong>Vanguard Industries Terminal</strong><br>
                Version: 1.0.0<br>
                Developed for advanced simulations and research.<br>
            `;
        },
        clear: () => {
            $output.html(""); // Efface le contenu de la zone de sortie
            return null;
        },
    };

    // Fonction pour exécuter une commande
    function executeCommand(input) {
        const cmd = input.trim().toLowerCase(); // Normalisation de la commande
        if (commands[cmd]) {
            const response = commands[cmd]();
            if (response) {
                appendOutput(response); // Ajoute la réponse à la zone de sortie
            }
        } else {
            appendOutput(`<span class="error">Command not recognized: "${cmd}"</span>`);
        }
    }

    // Fonction pour afficher du texte dans la zone de sortie
    function appendOutput(content) {
        $output.append(`<p>${content}</p>`); // Ajoute une ligne de texte
        $output.scrollTop($output[0].scrollHeight); // Scroll automatiquement vers le bas
    }

    // Gestion de l'événement "Entrée" sur le champ de saisie
    $input.on("keydown", function (e) {
        if (e.key === "Enter") {
            const value = $input.val(); // Récupère la valeur saisie
            appendOutput(`<span class="input">> ${value}</span>`); // Affiche la commande saisie
            executeCommand(value); // Exécute la commande
            $input.val(""); // Réinitialise le champ de saisie
        }
    });
});
