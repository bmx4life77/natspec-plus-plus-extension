export const NATSPEC_TAGS = {
    // Execution Control
    'parallel': {
        name: 'parallel',
        description: 'Indicates if function supports parallel execution',
        valueType: 'boolean',
        category: 'execution'
    },
    'atomic': {
        name: 'atomic',
        description: 'Function must execute atomically across all shards',
        valueType: 'boolean',
        category: 'execution'
    },
    // ... include all your tag definitions from the original file
};
export function getExampleValue(tagDef) {
    switch (tagDef.valueType) {
        case 'boolean': return 'true';
        case 'number': return '100';
        case 'string': return '"example"';
        case 'array': return '["item1", "item2"]';
        case 'enum': return tagDef.possibleValues ? `"${tagDef.possibleValues[0]}"` : '"value"';
        case 'object': return '{"key": "value"}';
        default: return 'value';
    }
}
//# sourceMappingURL=tagDefinitions.js.map