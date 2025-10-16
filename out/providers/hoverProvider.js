import * as vscode from 'vscode';
import { NATSPEC_TAGS, getExampleValue } from '../utils/tagDefinitions.js';
export class HoverProvider {
    tags;
    constructor(tags) {
        this.tags = tags;
    }
    provideHover(document, position, token) {
        const range = document.getWordRangeAtPosition(position);
        if (!range)
            return;
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
    isNatSpecTag(line, word) {
        return line.includes(`@${word}:`) || line.includes(`@${word} `);
    }
    createTagHover(tagDef, range) {
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
//# sourceMappingURL=hoverProvider.js.map