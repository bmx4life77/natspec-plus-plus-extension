import * as vscode from 'vscode';
import { NATSPEC_TAGS, getExampleValue } from '../utils/tagDefinitions';

export class NatSpecHoverProvider implements vscode.HoverProvider {
  provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.Hover> {
    const range = document.getWordRangeAtPosition(position);
    if (!range) return;

    const word = document.getText(range);
    const line = document.lineAt(position).text;

    if (this.isNatSpecTag(line, word)) {
      const tagDef = NATSPEC_TAGS[word];
      if (tagDef) {
        return this.createTagHover(tagDef, range);
      }
    }

    return;
  }

  private isNatSpecTag(line: string, word: string): boolean {
    return line.includes(`@${word}:`) || line.includes(`@${word} `);
  }

  private createTagHover(tagDef: any, range: vscode.Range): vscode.Hover {
    const markdown = new vscode.MarkdownString();
    markdown.appendCodeblock(`@${tagDef.name}`, 'natspec');
    markdown.appendMarkdown(`**${tagDef.description}**\n\n`);
    markdown.appendMarkdown(`**Type:** \`${tagDef.valueType}\`\n\n`);
    markdown.appendMarkdown(`**Category:** \`${tagDef.category}\`\n\n`);
    
    if (tagDef.possibleValues) {
      markdown.appendMarkdown(`**Possible values:** \`${tagDef.possibleValues.join(', ')}\`\n\n`);
    }
    
    markdown.appendMarkdown(`**Example:**\n`);
    markdown.appendCodeblock(`/// @${tagDef.name}: ${getExampleValue(tagDef)}`, 'solidity');

    return new vscode.Hover(markdown, range);
  }
}