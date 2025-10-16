"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
const completionProvider_1 = require("./providers/completionProvider");
const hoverProvider_1 = require("./providers/hoverProvider");
const commands_1 = require("./commands");
const diagnostics_1 = require("./providers/diagnostics");
function activate(context) {
    console.log('NatSpec++ extension activated');
    // Register providers
    const completionProvider = vscode.languages.registerCompletionItemProvider({ scheme: 'file', language: 'solidity' }, new completionProvider_1.NatSpecCompletionProvider(), '@');
    const hoverProvider = vscode.languages.registerHoverProvider({ scheme: 'file', language: 'solidity' }, new hoverProvider_1.NatSpecHoverProvider());
    // Register commands
    const commands = (0, commands_1.registerCommands)();
    // Setup diagnostics
    const diagnostics = (0, diagnostics_1.setupDiagnostics)();
    // Add to subscriptions
    context.subscriptions.push(completionProvider, hoverProvider, ...commands, diagnostics);
    // Setup status bar
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.text = '$(tag) NatSpec++';
    statusBarItem.tooltip = 'NatSpec++ Parallel Execution Documentation';
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);
}
function deactivate() {
    console.log('NatSpec++ extension deactivated');
}
//# sourceMappingURL=extension.js.map