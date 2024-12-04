$(document).ready(function () {
    const $output = $("#output");
    const $input = $("#commandInput");

    // Commandes disponibles
    const commands = {
        help: () => `
            <strong>Available commands:</strong><br>
            <span class="highlight">help</span> - Show this help message<br>
            <span class="highlight">about</span> - Information about Vanguard Industries<br>
            <span class="highlight">clear</span> - Clear the terminal<br>
            <span class="highlight">touch [filename]</span> - Create a new file<br>
            <span class="highlight">edit [filename]</span> - Edit an existing file<br>
            <span class="highlight">rm [filename]</span> - Delete a file<br>
            <span class="highlight">ls</span> - List all files<br>
            <span class="highlight">cat [filename]</span> - View file content<br>
            <span class="highlight">pwd</span> - Show current working directory<br>
            <span class="highlight">echo [text]</span> - Print text to the terminal<br>
        `,
        about: () => `
            <strong>Vanguard Industries Terminal</strong><br>
            Version: 1.2.0<br>
            A fully interactive terminal with file management capabilities.<br>
        `,
        clear: () => {
            $output.html("");
            return null;
        },
        pwd: () => {
            return `/data`;
        },
        echo: (args) => {
            return args.join(" ");
        },
        touch: async (args) => {
            const filename = args[0];
            if (!filename) return "Error: Missing filename.";
            try {
                const response = await fetch('/api/touch', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ filename }),
                });
                const text = await response.text();
                return response.ok ? text : `Error: ${text}`;
            } catch (error) {
                return "Error: Unable to create file.";
            }
        },
        edit: async (args) => {
            const filename = args[0];
            if (!filename) return "Error: Missing filename.";
            const content = prompt(`Edit "${filename}":`);
            if (content === null) return "Edit cancelled.";
            try {
                const response = await fetch('/api/edit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ filename, content }),
                });
                const text = await response.text();
                return response.ok ? text : `Error: ${text}`;
            } catch (error) {
                return "Error: Unable to edit file.";
            }
        },
        rm: async (args) => {
            const filename = args[0];
            if (!filename) return "Error: Missing filename.";
            try {
                const response = await fetch(`/api/rm/${filename}`, { method: 'DELETE' });
                const text = await response.text();
                return response.ok ? text : `Error: ${text}`;
            } catch (error) {
                return "Error: Unable to delete file.";
            }
        },
        ls: async () => {
            try {
                const response = await fetch('/api/ls');
                const files = await response.json();
                return files.length ? `Files:<br>${files.join("<br>")}` : "No files found.";
            } catch (error) {
                return "Error: Unable to list files.";
            }
        },
        cat: async (args) => {
            const filename = args[0];
            if (!filename) return "Error: Missing filename.";
            try {
                const response = await fetch(`/api/cat/${filename}`);
                const text = await response.text();
                return response.ok ? text : `Error: ${text}`;
            } catch (error) {
                return "Error: Unable to read file.";
            }
        },
    };

    // Fonction pour exécuter une commande
    async function executeCommand(input) {
        const [cmd, ...args] = input.trim().split(" ");
        if (commands[cmd]) {
            const response = await commands[cmd](args);
            if (response) {
                appendOutput(response);
            }
        } else {
            appendOutput(`<span class="error">Command not recognized: "${cmd}"</span>`);
        }
    }

    // Fonction pour afficher du texte dans la zone de sortie
    function appendOutput(content) {
        $output.append(`<p>${content}</p>`);
        $output.scrollTop($output[0].scrollHeight);
    }

    // Gestion de l'événement "Entrée" sur le champ de saisie
    $input.on("keydown", function (e) {
        if (e.key === "Enter") {
            const value = $input.val();
            appendOutput(`<span class="input">> ${value}</span>`);
            executeCommand(value);
            $input.val("");
        }
    });
});
