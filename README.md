# NatSpec++ Protocol - VS Code Extension

## NatSpec++ VS Code Solidity

Advanced NatSpec tag support for Parallel Execution Fabric and Smart Contract Documentation

🚀 Features

- Intelligent Autocomplete - Context-aware NatSpec++ tag suggestions
- Code Snippets - Pre-built templates for parallel execution patterns
- Real-time Validation - Live diagnostics for tag conflicts and errors
- Hover Documentation - Detailed explanations for all NatSpec++ tags
- Syntax Highlighting - Custom coloring for parallel execution tags

## Supported NatSpec++ Tags

### Execution Control

- @parallel - Parallel execution support
- @atomic - Atomic cross-shard execution
- @sequential - Sequential execution requirements

### Parallelization

- @threadSafe - Concurrent execution safety
- @maxConcurrency - Maximum concurrent executions
- @shard - Shard context (byUser, byContract, system, cross, global)

### Intrinsic Architecture

- @intrinsic - ISA-aware execution
- @vectorized - SIMD vectorization support
- @fabric - Execution fabric requirements

## Installation

From VSIX:

code --install-extension natspec-plus-plus-1.0.0.vsix

From Source:

git clone <https://github.com/bmx4life77/natspec-plus-plus-extension>
cd natspec-plus-plus-extension
npm install
npm run compile
npm run package

## 🎯 Quick Start

1. Open a Solidity file (.sol)
2. Type /// @ for autocomplete suggestions
3. Use natspec-parallel snippet for parallel functions
4. Press Ctrl+Shift+N to insert tags quickly

## Example Usage

```solidity
## Example Usage

### Basic Parallel Processing

```solidity
/**
 * @notice Process batch transactions in parallel
 * @dev Optimized for parallel execution fabric
 * @parallel: true
 * @threadSafe: true
 * @shard: "byUser"
 * @maxConcurrency: 100
 * @intrinsic: true
 * @vectorized: true
 */
function processBatch(Transaction[] calldata transactions) external {
    // Parallel execution logic
}
```

### Cross-Shard Atomic Operations

```solidity
/**
 * @notice Transfer assets across shards
 * @dev Ensures atomic completion across all involved shards
 * @atomic: true
 * @shard: "cross"
 * @dependency: ["AssetRegistry", "BridgeContract"]
 * @gasOptimized: true
 */
function crossShardTransfer(
    uint256 fromShard,
    uint256 toShard,
    uint256 amount
) external {
    // Cross-shard atomic transfer logic
}
```

### Vectorized Computation

```solidity
/**
 * @notice Perform matrix operations using hardware acceleration
 * @dev Utilizes SIMD instructions when available
 * @parallel: true
 * @vectorized: true
 * @intrinsic: true
 * @shard: "isolated"
 * @maxConcurrency: 256
 */
function computeMatrix(uint256[][] memory data) external {
    // Vectorized computation logic
}
```

### Using Snippets

Type `natspec-parallel` and press Tab to get a complete template:

```Solidity
/**
 * @notice ${1:Function description}
 * @dev ${2:Developer notes}
 * @parallel: true
 * @threadSafe: ${3|true,false|}
 * @shard: ${4|byUser,byContract,system,cross,global,isolated|}
 * @dependency: [${5:"dependency1"}]
 * @maxConcurrency: ${6:10}
 * @gasOptimized: ${7|true,false|}
 */



## 🧠 Enabling GPT-5 Mini for All Clients

To enable GPT-5 mini for all clients using the NatSpec++ extension:

1. Ensure your VS Code extension is up to date and compiled (`npm run compile`).

2. In your extension settings, set:
   - `natspecPlusPlus.gpt5MiniEnabled: true`
3. All clients will now use GPT-5 mini for enhanced parallel documentation, completion, and diagnostics.
This unlocks advanced AI-powered features for Solidity and parallel execution workflows.

## ⚡ Potential Gas Optimization Suggestions

When using NatSpec++ tags for parallel execution, consider:

- Use `@parallel` and `@threadSafe` only for functions that truly benefit from concurrency to avoid unnecessary overhead.
- Limit `@maxConcurrency` to the minimum required for your workload.
- Prefer `@shard: "byUser"` or `@shard: "byContract"` for localized state changes to reduce cross-shard gas costs.
- Use `@intrinsic` and `@vectorized` only when hardware acceleration is available and justified by workload size.
- Document expected gas impact in your NatSpec comments for each function.

Example:

/**

- @notice Parallel batch processing

  @parallel: true

  @maxConcurrency: 10

  @shard: "byUser"

  @dev Gas cost scales with concurrency and shard locality
 */
function batchProcess(...) external { ... }

## 🛠 Development

- Install dependencies: `npm install`
- Compile TypeScript: `npm run compile`
- Package extension: `npm run package`
- Run in development mode: Press F5 in VS Code

## 📊 ISA Rebellion Metrics

This extension supports the ISA Rebellion Metrics framework for measuring parallel execution efficiency:

- Beta (β) - Parallelization efficiency
- Vectorization Utilization - SIMD optimization
- Intrinsic Operation Ratio - Hardware optimization
- Fabric Integration Score - Cross-shard performance
- Security Dimension (Ψ5) - Security compliance

## 🤝 Contributing

Pull requests and issues are welcome!

## 📄 License

MIT

## 🔗 Links

- Parallel Execution Fabric
- ISA Rebellion Metrics Documentation-(Refer to 'docs/isa-rebellion-metrics.md)
