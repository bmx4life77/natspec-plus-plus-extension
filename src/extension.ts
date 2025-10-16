import * as vscode from 'vscode';
import { NatSpecCompletionProvider } from './providers/completionProvider';
import { NatSpecHoverProvider } from './providers/hoverProvider';
import { registerCommands } from './commands';
import { setupDiagnostics } from './providers/diagnostics';

export function activate(context: vscode.ExtensionContext) {
  console.log('NatSpec++ extension activated');

  // Register providers
  const completionProvider = vscode.languages.registerCompletionItemProvider(
    { scheme: 'file', language: 'solidity' },
    new NatSpecCompletionProvider(),
    '@'
  );

  const hoverProvider = vscode.languages.registerHoverProvider(
    { scheme: 'file', language: 'solidity' },
    new NatSpecHoverProvider()
  );

  // Register commands
  const commands = registerCommands();

  // Setup diagnostics
  const diagnostics = setupDiagnostics();

  // Add to subscriptions
  context.subscriptions.push(
    completionProvider,
    hoverProvider,
    ...commands,
    diagnostics
  );

  // Setup status bar
  const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  statusBarItem.text = '$(tag) NatSpec++';
  statusBarItem.tooltip = 'NatSpec++ Parallel Execution Documentation';
  statusBarItem.show();
  context.subscriptions.push(statusBarItem);
}

export function deactivate() {
  console.log('NatSpec++ extension deactivated');
}