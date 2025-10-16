import * as vscode from 'vscode';
import { CompletionProvider } from './providers/completionProvider.js';
import { DiagnosticsProvider } from './providers/diagnostics.js';
import { HoverProvider } from './providers/hoverProvider.js';
import { NATSPEC_TAGS } from './utils/tagDefinitions.js';
export function activate(context) {
    // Register providers
    const completionProvider = new CompletionProvider(NATSPEC_TAGS);
    const diagnosticsProvider = new DiagnosticsProvider(NATSPEC_TAGS);
    const hoverProvider = new HoverProvider(NATSPEC_TAGS);
    // Register Solidity language support
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider({ scheme: 'file', language: 'solidity' }, completionProvider, '@' // Trigger character
    ), vscode.languages.registerHoverProvider({ scheme: 'file', language: 'solidity' }, hoverProvider));
    // Setup diagnostics
    const diagnostics = vscode.languages.createDiagnosticCollection('natspec-plus-plus');
    context.subscriptions.push(diagnostics);
    // Watch for document changes
    vscode.workspace.onDidChangeTextDocument(event => {
        if (event.document.languageId === 'solidity') {
            const diagnosticResults = diagnosticsProvider.provideDiagnostics(event.document);
            diagnostics.set(event.document.uri, diagnosticResults);
        }
    });
    // Register commands
    context.subscriptions.push(vscode.commands.registerCommand('natspec-plus-plus.insertTag', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor)
            return;
        const items = Object.entries(NATSPEC_TAGS).map(([key, tag]) => ({
            label: `@${tag.name}`,
            description: tag.description,
            detail: `Type: ${tag.valueType}`,
            tag: tag
        }));
        const selected = await vscode.window.showQuickPick(items, {
            placeHolder: 'Select a NatSpec++ tag'
        });
        if (selected) {
            const snippet = new vscode.SnippetString(`@${selected.tag.name}: \${1:${selected.tag.valueType}}\n`);
            editor.insertSnippet(snippet);
        }
    }));
    // Load configuration
    const config = vscode.workspace.getConfiguration('natspecPlusPlus');
    const extensionConfig = {
        gpt5MiniEnabled: config.get('gpt5MiniEnabled', false),
        maxConcurrency: config.get('maxConcurrency', 100)
    };
    // Watch for configuration changes
    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(e => {
        if (e.affectsConfiguration('natspecPlusPlus')) {
            const newConfig = vscode.workspace.getConfiguration('natspecPlusPlus');
            extensionConfig.gpt5MiniEnabled = newConfig.get('gpt5MiniEnabled', false);
            extensionConfig.maxConcurrency = newConfig.get('maxConcurrency', 100);
        }
    }));
}
export function deactivate() {
    // Cleanup tasks when extension is deactivated
}
//# sourceMappingURL=index.js.map