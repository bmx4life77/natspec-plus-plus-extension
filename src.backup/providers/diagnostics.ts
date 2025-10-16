// src/providers/diagnostics.ts
import * as vscode from 'vscode';

export function setupDiagnostics(): vscode.DiagnosticCollection {
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

function updateDiagnostics(document: vscode.TextDocument, diagnostics: vscode.DiagnosticCollection): void {
    // TODO: Implement the same diagnostics logic from the original code
    // For now, we'll just clear the diagnostics to avoid errors
    diagnostics.set(document.uri, []);
}