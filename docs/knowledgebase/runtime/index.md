---
title: Runtime
---

The runtime of a blockchain is the business logic that defines its behavior. In Substrate-based
chains, the runtime is referred to as the
"[state transition function](../../knowledgebase/getting-started/glossary#state-transition-function-stf)";
it is where Substrate developers define the storage items that are used to represent the
blockchain's [state](../../knowledgebase/getting-started/glossary#state) as well as the
[functions](../../knowledgebase/learn-substrate/extrinsics) that allow blockchain users to make
changes to this state.

In order to provide its defining forkless runtime upgrade capabilities, Substrate uses runtimes that
are built as [WebAssembly (Wasm)](../../knowledgebase/getting-started/glossary#webassembly-wasm)
bytecode. Substrate also defines the
core primitives that the runtime must
implement.
## Core Primitives
The Substrate runtime is composed with a set of primitive types that are expected by the rest of the
Substrate framework. In this way, it makes minimal assumptions about what your runtime must provide to the other
layers of Substrate. They are mandatory to define and must fulfill a particular interface in order
to work within the Substrate framework.

They are:

- `Hash`: A type which encodes a cryptographic digest of some data. Typically just a 256-bit
  quantity.

- `DigestItem`: A type which must be able to encode one of a number of "hard-wired" alternatives
  relevant to consensus and change-tracking as well as any number of "soft-coded" variants, relevant
  to specific modules within the runtime.

- `Digest`: A series of DigestItems. This encodes all information that is relevant for a
  light-client to have on hand within the block.

- `Extrinsic`: A type to represent a single piece of data external to the blockchain that is
  recognized by the blockchain. This typically involves one or more signatures, and some sort of
  encoded instruction (e.g. for transferring ownership of funds or calling into a smart contract).

- `Header`: A type which is representative (cryptographically or otherwise) of all information
  relevant to a block. It includes the parent hash, the storage root and the extrinsics trie root,
  the digest and a block number.

- `Block`: Essentially just a combination of `Header` and a series of `Extrinsic`s, together with a
  specification of the hashing algorithm to be used.

- `BlockNumber`: A type which encodes the total number of ancestors any valid block has. Typically a
  32-bit quantity.

## FRAME Primitives

The core Substrate codebase ships with [FRAME](../../knowledgebase/runtime/frame), Parity's system
for Substrate runtime development that is used for chains like
[Kusama](https://github.com/paritytech/polkadot/blob/master/runtime/kusama/src/lib.rs) and
[Polkadot](https://github.com/paritytech/polkadot/blob/master/runtime/polkadot/src/lib.rs). FRAME
defines additional [runtime primitives](../../knowledgebase/runtime/primitives#frame-primitives) and
provides a framework that makes it easy to construct a runtime by composing modules, called
"pallets". Each pallet encapsulates domain-specific logic that is expressed as a set of a
[storage items](../../knowledgebase/runtime/storage), [events](../../knowledgebase/runtime/events),
[errors](../../knowledgebase/runtime/errors) and
[dispatchable functions](../../knowledgebase/getting-started/glossary#dispatch). FRAME developers
can [create their own pallets](../../knowledgebase/runtime/pallets) and reuse existing pallets,
including [over 50 that ship with Substrate](../../knowledgebase/runtime/frame#prebuilt-pallets).

![Runtime Composition](assets/frame-runtime.png)

There are an additional set of primitives that are assumed about a runtime built with the Substrate
FRAME:

- `Call`: The dispatch type that can be called via an extrinsic.

- `Origin`: Represents where a call came from. For example, a signed message (a transaction), an
  unsigned message (an inherent extrinsic), and a call from the runtime itself (a root call).

- `Index`: An account index (aka nonce) type. This stores the number of previous transactions
  associated with a sender account.

- `Hashing`: The hashing system (algorithm) being used in the runtime (e.g. Blake2).

- `AccountId`: The type used to identify user accounts in the runtime.

- `Event`: The type used for events emitted by the runtime.

- `Version`: A type which represents the version of the runtime.

Although a lot of core runtime development can be enabled with FRAME and its related primitives, FRAME is not the only system for developing Substrate based blockchains.
## Next Steps

### Learn More

- Learn about the [Substrate FRAME](frame).
- Follow a
  [tutorial to develop your first Substrate chain](../../tutorials/create-your-first-substrate-chain/).
- Follow a [tutorial to add a pallet to your Substrate runtime](../../tutorials/add-a-pallet/).

### Examples

- See how these generic types are implemented
  [in the Substrate node](https://github.com/paritytech/substrate/blob/master/bin/node/runtime/src/lib.rs).

### References

- View the
  [primitive types defined in `node-primitives`](https://substrate.dev/rustdocs/v3.0.0/node_primitives/index.html).

- View the
  [`traits` defined in `sp-runtime`](https://substrate.dev/rustdocs/v3.0.0/sp_runtime/traits/index.html)
