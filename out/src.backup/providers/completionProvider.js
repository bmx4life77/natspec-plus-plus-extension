"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NatSpecCompletionProvider = void 0;
const vscode = require("vscode");
const tagDefinitions_1 = require("../utils/tagDefinitions");
class NatSpecCompletionProvider {
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
        Object.entries(tagDefinitions_1.NATSPEC_TAGS).forEach(([tagName, tagDef]) => {
            const item = new vscode.CompletionItem(tagName, vscode.CompletionItemKind.Property);
            item.detail = `@${tagName} (${tagDef.category})`;
            item.documentation = this.createTagDocumentation(tagDef);
            item.insertText = new vscode.SnippetString(`${tagName}: \${1:${(0, tagDefinitions_1.getExampleValue)(tagDef)}}`);
            completionItems.push(item);
        });
        return new vscode.CompletionList(completionItems, true);
    }
    createTagDocumentation(tagDef) {
        return new vscode.MarkdownString(`**${tagDef.description}**\n\n` +
            `Type: \`${tagDef.valueType}\`\n\n` +
            `Category: \`${tagDef.category}\`\n\n` +
            (tagDef.possibleValues ? `Possible values: \`${tagDef.possibleValues.join(', ')}\`\n\n` : '') +
            `Usage: \`/// @${tagDef.name}: ${(0, tagDefinitions_1.getExampleValue)(tagDef)}\``);
    }
}
exports.NatSpecCompletionProvider = NatSpecCompletionProvider;
//# sourceMappingURL=completionProvider.js.map