
# Vanguard Industries Terminal

An interactive web terminal I made for fun with friends on my Minecraft SMP. It has real file management capabilities. This project uses **Node.js** and **Express** to simulate a command terminal that allows you to create, edit, delete, and list files in a `data` folder. I'm willing to make it a "SCP-like" terminal in the future.

## Features

- **Available commands**:
  - `help`: Displays a list of available commands.
  - `about`: Displays information about the terminal.
  - `clear`: Clears the terminal screen.
  - `pwd`: Displays the current directory (simulated as `/data`).
  - `echo [text]`: Displays the provided text.
  - `touch [filename]`: Creates an empty file in the `data` folder.
  - `edit [filename]`: Edits an existing file in the `data` folder.
  - `rm [filename]`: Deletes a file from the `data` folder.
  - `ls`: Lists files in the `data` folder.
  - `cat [filename]`: Displays the content of a file in the `data` folder.

## Prerequisites

Before you begin, you must have **Node.js** installed on your machine.

1. Download and install Node.js from [nodejs.org](https://nodejs.org/).
2. Verify the installation:
   ```bash
   node -v
   npm -v
   ```

## Installation

### Step 1: Clone the repository

Clone the repository to your local machine:

```bash
git clone https://github.com/BENZOOgataga/VanguardTerminal.git
cd VanguardTerminal
```

### Step 2: Install dependencies

Install the required dependencies using `npm`:

```bash
npm install
```

### Step 3: Start the server

Start the server with **Node.js**:

```bash
node server.js
```

Or, to use **Nodemon** (which automatically restarts the server when code changes):

```bash
npm install -g nodemon
nodemon server.js
```

### Step 4: Access the terminal

Open your browser and navigate to [http://localhost:3000](http://localhost:3000). You will see the terminal interface where you can enter commands.

## Usage

Once the server is running, you can use the following commands in the terminal:

- **`touch [filename]`**: Creates an empty file in the `data` folder. Example: `touch example.txt`.
- **`edit [filename]`**: Edits an existing file in the `data` folder. Example: `edit example.txt`.
- **`rm [filename]`**: Deletes a file from the `data` folder. Example: `rm example.txt`.
- **`ls`**: Lists existing files in the `data` folder.
- **`cat [filename]`**: Displays the content of a file. Example: `cat example.txt`.
- **`pwd`**: Displays the current directory (`/data`).
- **`echo [text]`**: Displays the text you provided. Example: `echo Hello, Vanguard!`

## Project Structure

```
VanguardTerminal/
├── data/               # Contains created/modified files
├── public/             # Contains frontend files (HTML, CSS, JS)
│   ├── index.html
│   ├── styles.css
│   ├── script.js
├── server.js           # Node.js server that handles API requests
├── package.json        # Dependencies and npm scripts
└── package-lock.json
```

## Contribution

1. Fork the repository.
2. Create a branch for your feature (`git checkout -b feature-new-feature`).
3. Make your changes.
4. Commit the changes (`git commit -am 'Added a new feature'`).
5. Push your branch (`git push origin feature-new-feature`).
6. Create a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

If you have any questions or suggestions, feel free to open an **issue** or contact me via GitHub/Discord.
