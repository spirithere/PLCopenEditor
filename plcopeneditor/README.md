# PLCopen XML Editor Extension

This VSCode extension allows you to import PLCopen XML files, edit the code in
a directory structure, and export back to XML format. The goal is to provide a
familiar code editing experience similar to dedicated PLC IDEs.

## Features

- **Import PLCopen XML**: Converts XML files into a directory structure with
  code files.
- **Edit ST Code**: Edit Structured Text (.st) files with syntax highlighting.
- **Export to PLCopen XML**: Converts the edited code back into a PLCopen XML
  file.

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
npm install
```

## Usage

1. Open the command palette (`Ctrl+Shift+P`) and run `Import PLCopen XML`.
2. Select the PLCopen XML file to import.
3. Edit the `.st` files generated in the workspace.
4. Run `Export PLCopen XML` to generate an updated XML file.

## Development

### Build and Run

```bash
npm install
npm run compile
```

Press `F5` in VSCode to launch the extension in a new Extension Development
Host window.

### Tests

Run unit tests with:

```bash
npm test
```

## Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md)
for guidelines.

## License

This project is licensed under the MIT License.
