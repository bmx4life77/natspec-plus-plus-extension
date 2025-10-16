import * as vscode from 'vscode';
export class DiagnosticsProvider {
    tags;
    diagnosticCollection;
    constructor(tags) {
        this.tags = tags;
        this.diagnosticCollection = vscode.languages.createDiagnosticCollection('natspec-plus-plus');
        this.setupDiagnostics();
    }
    setupDiagnostics() {
        // Listen to document changes
        vscode.workspace.onDidChangeTextDocument(event => {
            if (event.document.languageId === 'solidity') {
                const diagnostics = this.provideDiagnostics(event.document);
                this.diagnosticCollection.set(event.document.uri, diagnostics);
            }
        });
        // Check active document on initialization
        if (vscode.window.activeTextEditor?.document.languageId === 'solidity') {
            const diagnostics = this.provideDiagnostics(vscode.window.activeTextEditor.document);
            this.diagnosticCollection.set(vscode.window.activeTextEditor.document.uri, diagnostics);
        }
    }
    provideDiagnostics(document) {
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
}
//# sourceMappingURL=diagnostics.js.map