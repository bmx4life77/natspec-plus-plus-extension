"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupDiagnostics = setupDiagnostics;
// src/providers/diagnostics.ts
const vscode = require("vscode");
function setupDiagnostics() {
    const diagnostics = vscode.languages.createDiagnosticCollection('natspec-plus-plus');
    // Listen to document changes and update diagnostics
    vscode.workspace.onDidChangeTextDocument(event => {
        if (event.document.languageId === 'solidity') {
            updateDiagnostics(event.document, diagnostics);
        }
    });
    // Also check the active document when the extension is activated
    if (vscode.window.activeTextEditor?.document.languageId === 'solidity') {
        updateDiagnostics(vscode.window.activeTextEditor.document, diagnostics);
    }
    return diagnostics;
}
function updateDiagnostics(document, diagnostics) {
    // TODO: Implement the same diagnostics logic from the original code
    // For now, we'll just clear the diagnostics to avoid errors
    diagnostics.set(document.uri, []);
}
//# sourceMappingURL=diagnostics.js.map