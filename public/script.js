$(document).ready(function () {
    const $output = $("#output");
    const $input = $("#commandInput");

    let currentUser = 'guest'; // Default user
    let authenticated = false; // Whether the user is logged in
    const userPasswords = { root: 'root', guest: 'guest', admin: 'admin' }; // Default passwords

    let inputMode = null; // Tracks the current input mode and type

    const commands = {
        help: () => `
            <strong>Available commands:</strong><br>
            <span class="highlight">help</span> - Show this help message<br>
            <span class="highlight">about</span> - Information about Vanguard Industries<br>
            <span class="highlight">clear</span> - Clear the terminal<br>
            <span class="highlight">login [user]</span> - Login as a user (e.g., root, admin, guest)<br>
            <span class="highlight">passwd</span> - Change your password<br>
            <span class="highlight">ls</span> - List files<br>
            <span class="highlight">cat [filename]</span> - View the contents of a file<br>
            <span class="highlight">touch [filename]</span> - Create a new file<br>
            <span class="highlight">edit [filename]</span> - Edit a file<br>
            <span class="highlight">rm [filename]</span> - Delete a file<br>
            <span class="highlight">echo [text]</span> - Print text to the terminal<br>
            <span class="highlight">exit</span> - Log out<br>
        `,
        about: () => `
            <strong>Vanguard Industries Terminal</strong><br>
            A hacker-style interactive terminal with dynamic commands.<br>
        `,
        clear: () => {
            $output.html("");
            return null;
        },
        login: (args) => {
            const username = args[0];
            if (!username) return "Error: Missing username.";
            if (!userPasswords[username]) return `Error: User "${username}" not found.`;

            appendOutput(`Enter password for ${username}:`);
            setInputMode({ type: 'login', username }, (password) => {
                if (password === userPasswords[username]) {
                    currentUser = username;
                    authenticated = true;
                    resetInputMode();
                    updatePrompt();
                    appendOutput(`Login successful as ${username}. Type 'help' for commands.`);
                } else {
                    appendOutput("Error: Incorrect password.");
                    resetInputMode(); // Allow retrying
                }
            });
        },
        passwd: () => {
            if (!authenticated) return "Error: You must be logged in to change your password.";

            appendOutput("Enter your current password:");
            setInputMode({ type: 'passwd', step: 1, newPassword: '' }, (input) => {
                if (inputMode.step === 1) {
                    // Verify current password
                    if (input !== userPasswords[currentUser]) {
                        appendOutput("Error: Incorrect current password.");
                        resetInputMode(); // Exit passwd flow
                        return;
                    }
                    appendOutput("Enter new password:");
                    inputMode.step = 2;
                } else if (inputMode.step === 2) {
                    // Save new password temporarily
                    inputMode.newPassword = input;
                    appendOutput("Confirm new password:");
                    inputMode.step = 3;
                } else if (inputMode.step === 3) {
                    // Confirm new password
                    if (input !== inputMode.newPassword) {
                        appendOutput("Error: Passwords do not match.");
                        resetInputMode(); // Exit passwd flow
                        return;
                    }
                    userPasswords[currentUser] = inputMode.newPassword;
                    appendOutput("Password changed successfully.");
                    resetInputMode(); // Exit passwd flow
                }
            });
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
        cat: (args) => {
            const filename = args[0];
            return filename ? `Viewing contents of "${filename}"` : "Error: Missing filename.";
        },
        touch: (args) => {
            const filename = args[0];
            return filename ? `File "${filename}" created.` : "Error: Missing filename.";
        },
        edit: (args) => {
            const filename = args[0];
            return filename ? `Editing file "${filename}"...` : "Error: Missing filename.";
        },
        rm: (args) => {
            const filename = args[0];
            return filename ? `File "${filename}" deleted.` : "Error: Missing filename.";
        },
        echo: (args) => args.join(" "),
        exit: () => {
            if (authenticated) {
                appendOutput(`Logging out ${currentUser}...`);
                authenticated = false;
                currentUser = 'guest';
                updatePrompt();
            } else {
                appendOutput("Error: You are not logged in.");
            }
        }
    };

    // Set input mode for custom flows like login or passwd
    function setInputMode(mode, callback) {
        inputMode = mode;
        inputMode.callback = callback;
        $input.val("");
        $input.attr("type", mode.type === 'login' || mode.type === 'passwd' ? 'password' : 'text');
    }

    // Reset input mode to default
    function resetInputMode() {
        inputMode = null;
        $input.attr("type", "text");
    }

    // Update the terminal prompt
    function updatePrompt() {
        const promptText = authenticated ? 
            `${currentUser}@vanguard:~# ` : 
            `guest@vanguard:~$ `;
        $input.attr("placeholder", promptText);
    }

    // Append content to the terminal
    function appendOutput(content) {
        $output.append(`<p>${content}</p>`);
        $output.scrollTop($output[0].scrollHeight);
    }

    // Command execution logic
    $input.on("keydown", function (e) {
        if (e.key === "Enter") {
            const value = $input.val();
            appendOutput(`<span class="input">> ${value}</span>`);
            if (inputMode && inputMode.callback) {
                inputMode.callback(value);
            } else {
                const [cmd, ...args] = value.trim().split(" ");
                if (commands[cmd]) {
                    const response = commands[cmd](args);
                    if (response) appendOutput(response);
                } else {
                    appendOutput(`<span class="error">Command not recognized: "${cmd}"</span>`);
                }
            }
            $input.val("");
        }
    });

    // Initialize terminal
    updatePrompt();
});
