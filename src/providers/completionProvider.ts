import * as vscode from 'vscode';
import { NATSPEC_TAGS, getExampleValue } from '../utils/tagDefinitions';

export class NatSpecCompletionProvider implements vscode.CompletionItemProvider {
  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken,
    context: vscode.CompletionContext
  ): vscode.ProviderResult<vscode.CompletionList> {
    const lineText = document.lineAt(position).text;
    const linePrefix = lineText.substring(0, position.character);

    if (!this.isInNatSpecContext(linePrefix)) {
      return undefined;
    }

    return this.createCompletionItems();
  }

  private isInNatSpecContext(linePrefix: string): boolean {
    return (linePrefix.includes('///') || linePrefix.includes('*')) && 
           linePrefix.includes('@');
  }

  private createCompletionItems(): vscode.CompletionList {
    const completionItems: vscode.CompletionItem[] = [];

    Object.entries(NATSPEC_TAGS).forEach(([tagName, tagDef]) => {
      const item = new vscode.CompletionItem(tagName, vscode.CompletionItemKind.Property);
      item.detail = `@${tagName} (${tagDef.category})`;
      item.documentation = this.createTagDocumentation(tagDef);
      item.insertText = new vscode.SnippetString(`${tagName}: \${1:${getExampleValue(tagDef)}}`);
      completionItems.push(item);
    });

    return new vscode.CompletionList(completionItems, true);
  }

  private createTagDocumentation(tagDef: any): vscode.MarkdownString {
    return new vscode.MarkdownString(
      `**${tagDef.description}**\n\n` +
      `Type: \`${tagDef.valueType}\`\n\n` +
      `Category: \`${tagDef.category}\`\n\n` +
      (tagDef.possibleValues ? `Possible values: \`${tagDef.possibleValues.join(', ')}\`\n\n` : '') +
      `Usage: \`/// @${tagDef.name}: ${getExampleValue(tagDef)}\``
    );
  }
}