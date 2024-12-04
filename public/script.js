$(document).ready(function () {
    const $output = $("#output");
    const $input = $("#commandInput");

    let currentUser = 'guest'; // Default user is 'guest'
    
    // Fake system data for aesthetic
    const systemInfo = {
        ip: '192.168.1.100',
        os: 'Linux VanguardOS',
        uptime: '72 days, 6 hours',
        cpu: 56,  // We'll change this dynamically
        memory: { used: 3.4, total: 8 },  // GB
    };

    // Update system stats dynamically
    function updateSystemInfo() {
        // Simulate dynamic updates every few seconds
        systemInfo.cpu = Math.floor(Math.random() * 100);  // Random CPU usage
        systemInfo.memory.used = (Math.random() * systemInfo.memory.total).toFixed(1);  // Random memory usage

        $('#cpuUsage').text(`${systemInfo.cpu}%`);
        $('#memoryUsage').text(`${systemInfo.memory.used} GB / ${systemInfo.memory.total} GB`);
        $('#uptime').text(`72d 6h`);  // Keeping uptime static for simplicity
    }

    // Simulate system info updates every 3 seconds
    setInterval(updateSystemInfo, 3000);

    // Simulate login commands
    const commands = {
        help: () => `
            <strong>Available commands:</strong><br>
            <span class="highlight">help</span> - Show this help message<br>
            <span class="highlight">about</span> - Information about Vanguard Industries<br>
            <span class="highlight">clear</span> - Clear the terminal<br>
            <span class="highlight">login [user]</span> - Login as a user (guest, admin, root)<br>
            <span class="highlight">status</span> - Show system status<br>
            <span class="highlight">ls</span> - List files in the "data" folder<br>
            <span class="highlight">echo [text]</span> - Print text to the terminal<br>
            <span class="highlight">exit</span> - Log out
        `,
        about: () => `
            <strong>Vanguard Industries Terminal</strong><br>
            Version: 1.2.0<br>
            This is a hacker-themed terminal with simulated login and system data.<br>
        `,
        clear: () => {
            $output.html("");
            return null;
        },
        login: (args) => {
            const username = args[0];
            if (!username) return "Error: Missing username.";
            
            // Simulate login for different users
            if (username === 'admin' || username === 'root' || username === 'guest') {
                currentUser = username;
                appendOutput(`Login successful as ${username}. Type 'help' for commands.`);
                updatePrompt();
                return;
            }

            return `Error: Invalid username "${username}". Try 'guest', 'admin', or 'root'.`;
        },
        status: () => {
            return `
                <strong>System Info:</strong><br>
                IP Address: ${systemInfo.ip}<br>
                OS: ${systemInfo.os}<br>
                Uptime: ${systemInfo.uptime}<br>
                CPU Usage: ${systemInfo.cpu}%<br>
                Memory Usage: ${systemInfo.memory.used} GB / ${systemInfo.memory.total} GB<br>
            `;
        },
        ls: () => {
            return "example.txt\nnotes.txt\nconfig.json";
        },
        echo: (args) => {
            return args.join(" ");
        },
        exit: () => {
            appendOutput("Logging out...");
            currentUser = 'guest';  // Default user
            updatePrompt();
            return null;
        }
    };

    // Update prompt based on the current user (guest, admin, root)
    function updatePrompt() {
        let promptText = currentUser === 'guest' ? 
            `guest@vanguard:~$ ` : 
            `${currentUser}@vanguard:~# `;
        $('#commandInput').attr("placeholder", promptText);
    }

    // Function to execute commands
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

    // Function to append output in terminal
    function appendOutput(content) {
        $output.append(`<p>${content}</p>`);
        $output.scrollTop($output[0].scrollHeight);
    }

    // Event listener for command input
    $input.on("keydown", function (e) {
        if (e.key === "Enter") {
            const value = $input.val();
            appendOutput(`<span class="input">> ${value}</span>`);
            executeCommand(value);
            $input.val("");
        }
    });

    // Initial prompt setup
    updatePrompt();
});
