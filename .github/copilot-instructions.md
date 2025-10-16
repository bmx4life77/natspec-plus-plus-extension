# Copilot Instructions for NatSpec++ VS Code Extension

## Project Overview
NatSpec++ extension provides advanced support for parallel execution and smart contract documentation in Solidity, focusing on:
- Parallel execution fabric integration
- Atomic cross-shard execution
- Intrinsic ISA-aware execution
- Smart contract documentation

## Architecture & Key Components

### Core Files
- `src/extension.ts`: Main entry point - registers providers and commands
- `src/utils/tagDefinitions.ts`: Single source of truth for NatSpec++ tags
- `src/providers/*`: Implements VS Code language features:
  - `completionProvider.ts`: Tag autocompletion
  - `diagnostics.ts`: Real-time validation
  - `hoverProvider.ts`: Documentation on hover

### Tag System
All NatSpec++ tags are defined in `tagDefinitions.ts` with this structure:
```typescript
interface NatSpecTag {
  name: string;
  description: string;
  valueType: 'boolean' | 'string' | 'number' | 'array' | 'enum' | 'object';
  category: string;
}
```

## Developer Workflows

### Build & Development
1. Install dependencies: `npm install`
2. Compile TypeScript: `npm run compile`  
3. Package extension: `npm run package`
4. Debug: Press F5 in VS Code

### Key User Commands
- `Ctrl+Shift+N` (Mac: `Cmd+Shift+N`): Quick tag insertion
- Type `/// @` for tag autocompletion
- Use `natspec-parallel` snippet for parallel function templates

## Project-Specific Patterns

### Tag Categories
- Execution Control: `@parallel`, `@atomic`, `@sequential`
- Parallelization: `@threadSafe`, `@maxConcurrency`, `@shard`
- Intrinsic Architecture: `@intrinsic`, `@vectorized`, `@fabric`

### Provider Pattern
All providers follow this workflow:
1. Get tag definitions from `tagDefinitions.ts`
2. Process current document context
3. Generate appropriate VS Code language feature response

## Integration Points

### ISA Rebellion Metrics
Extension integrates with ISA Rebellion framework for:
- Beta (β) - Parallelization efficiency
- Vectorization Utilization
- Intrinsic Operation Ratio
- Security Dimension (Ψ5)

### Solidity Integration
- Custom grammar injection for NatSpec++ tags
- Syntax highlighting rules in `syntaxes/`
- Tag-specific diagnostics and validation

## Common Tag Patterns & Examples

### Parallel Processing Pattern
```solidity
/**
 * @notice Batch process user transactions
 * @parallel: true
 * @threadSafe: true
 * @shard: "byUser"
 * @maxConcurrency: 100
 * @dependency: ["UserRegistry", "TransactionPool"]
 */
```

### Cross-Shard Atomic Operations
```solidity
/**
 * @notice Cross-chain asset transfer
 * @atomic: true
 * @shard: "cross"
 * @dependency: ["BridgeContract", "AssetVault"]
 * @gasOptimized: true
 */
```

### Vectorized Computation Pattern
```solidity
/**
 * @notice Matrix operations
 * @parallel: true
 * @vectorized: true
 * @intrinsic: true
 * @maxConcurrency: 256
 * @shard: "isolated"
 */
```

### Quick Snippets
Use `natspec-parallel` snippet for a complete template with all parallel execution tags:
```typescript
prefix: "natspec-parallel"
body: [
  "@parallel: true",
  "@threadSafe: ${1|true,false|}",
  "@shard: ${2|byUser,byContract,system,cross,global,isolated|}",
  "@dependency: [${3:\"dependency1\"}]",
  "@maxConcurrency: ${4:10}",
  "@gasOptimized: ${5|true,false|}"
]
```

## Tag Compatibility Rules
- `@atomic: true` requires `@shard: "cross"` for cross-shard operations
- `@vectorized` pairs well with `@parallel` and `@intrinsic`
- `@maxConcurrency` should be set based on `@shard` type:
  - "byUser": 10-100 typical
  - "isolated": Up to 256
  - "cross": Keep low (2-5) for gas efficiency

## Example: Adding New Tags
1. Add tag definition to `tagDefinitions.ts`:
```typescript
'newTag': {
  name: 'newTag',
  description: 'Description',
  valueType: 'boolean',
  category: 'execution'
}
```
2. Tag will be automatically picked up by providers
3. Add examples to snippets if needed

---
**Review needed**: Please validate:
1. Are there additional key files not covered?
2. Any missing development workflows?
3. Project-specific conventions that should be highlighted?
4. Integration points that need more detail?
