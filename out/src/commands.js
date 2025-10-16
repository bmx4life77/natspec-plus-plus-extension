"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCommands = registerCommands;
// src/commands.ts
const vscode = require("vscode");
function registerCommands() {
    const processTagsCommand = vscode.commands.registerCommand('natspec-plus-plus.processTags', () => {
        const terminal = vscode.window.createTerminal('NatSpec++');
        terminal.sendText('npx hardhat natspec process');
        terminal.show();
        vscode.window.showInformationMessage('Processing NatSpec++ tags...');
    });
    const validateTagsCommand = vscode.commands.registerCommand('natspec-plus-plus.validateTags', () => {
        const terminal = vscode.window.createTerminal('NatSpec++');
        terminal.sendText('npx hardhat natspec validate');
        terminal.show();
        vscode.window.showInformationMessage('Validating NatSpec++ tags...');
    });
    const generateDocsCommand = vscode.commands.registerCommand('natspec-plus-plus.generateDocs', () => {
        const terminal = vscode.window.createTerminal('NatSpec++');
        terminal.sendText('npx hardhat natspec generate-docs');
        terminal.show();
        vscode.window.showInformationMessage('Generating documentation...');
    });
    const insertTagCommand = vscode.commands.registerCommand('natspec-plus-plus.insertTag', () => {
        // We'll implement the tag insertion UI here
        vscode.window.showInformationMessage('Insert NatSpec++ tag');
    });
    return [
        processTagsCommand,
        validateTagsCommand,
        generateDocsCommand,
        insertTagCommand
    ];
}
//# sourceMappingURL=commands.js.map