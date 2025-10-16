import * as vscode from 'vscode';
import { NATSPEC_TAGS, getExampleValue } from '../utils/tagDefinitions.js';
export class CompletionProvider {
    tags;
    constructor(tags) {
        this.tags = tags;
    }
    provideCompletionItems(document, position, token, context) {
        const lineText = document.lineAt(position).text;
        const linePrefix = lineText.substring(0, position.character);
        if (!this.isInNatSpecContext(linePrefix)) {
            return undefined;
        }
        return this.createCompletionItems();
    }
    isInNatSpecContext(linePrefix) {
        return (linePrefix.includes('///') || linePrefix.includes('*')) &&
            linePrefix.includes('@');
    }
    createCompletionItems() {
        const completionItems = [];
        Object.entries(NATSPEC_TAGS).forEach(([tagName, tagDef]) => {
            const item = new vscode.CompletionItem(tagName, vscode.CompletionItemKind.Property);
            item.detail = `@${tagName} (${tagDef.category})`;
            item.documentation = this.createTagDocumentation(tagDef);
            item.insertText = new vscode.SnippetString(`${tagName}: \${1:${getExampleValue(tagDef)}}`);
            completionItems.push(item);
        });
        return new vscode.CompletionList(completionItems, true);
    }
    createTagDocumentation(tagDef) {
        return new vscode.MarkdownString(`**${tagDef.description}**\n\n` +
            `Type: \`${tagDef.valueType}\`\n\n` +
            `Category: \`${tagDef.category}\`\n\n` +
            (tagDef.possibleValues ? `Possible values: \`${tagDef.possibleValues.join(', ')}\`\n\n` : '') +
            `Usage: \`/// @${tagDef.name}: ${getExampleValue(tagDef)}\``);
    }
}
//# sourceMappingURL=completionProvider.js.map