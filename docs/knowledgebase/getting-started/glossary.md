---
title: Glossary
---

This page defines and explains many of the domain-specific terms that are common to the Substrate
ecosystem. This is a helpful resource for even the most experienced Substrate developers.

---

## Adaptive Quorum Biasing (AQB)

A means of specifying a passing threshold for a referendum based on voter turnout. Positive turnout
bias means that as more votes are cast, the passing threshold _decreases_; i.e. a higher turnout
positively increases the likelihood of a referendum passing. Negative turnout bias means that the
passing threshold _increases_ as more votes are cast. Negative turnout bias is also called "default
carries" as, given an apathetic voting body, the referendum will pass by default. A neutral turnout
bias specifies a simple majority passing threshold. AQB removes the need for strict quorums, which
are arbitrary and create undesirable governance mechanics. AQB is implemented in the
[Democracy pallet](../runtime/frame#democracy), which provides the interfaces for a number of
on-chain bodies (e.g. a [Collective](#council) or any token holder) to call referenda with positive,
neutral, or negative biases.

## AfG

An internal codename for "Al's Finality Gadget", which is named after
[Alistair Stewart](https://research.web3.foundation/en/latest/research_team_members/alistair.html)
who invented it. AfG is synonymous with [GRANDPA](#grandpa).

## Aggregation

Used in the context of [FRAME](#frame), "[pallet](#pallet) aggregation" means combining
analogous types from multiple runtime modules into a single type. This allows each module's
analogous types to be represented. Currently there are six such data types:

- `Call` - published functions that may be called with a set of arguments
- `Error` - used to inform users why a function invocation (`Call`) failed
- `Event` - pallets can emit events to make users aware of some state changes
- `Log` - an extensible header item
- `Metadata` - information that allows inspection of the above
- `Origin` - specifies the source of a function invocation (`Call`)

## Approval Voting

Voting system where voter can vote for as many candidates as desired. The candidate with highest
overall amount of votes wins. Notably:

- voting for all candidates is exactly equivalent to voting for none; and
- it is possible to vote "against" a single candidate by voting for all other candidates.

Approval voting is used by the
[FRAME Elections Phragmen pallet](../runtime/frame#elections-phragmen) that materializes as a
governing [Council](#council) on a number of Substrate-based chains.

## Author

The [node](#node) that is responsible for the creation of a [block](#block); block authors may be
referred to as block "producers". In a proof-of-work chain these nodes are called "miners".

## Authority

Authorities are the [nodes](#node) who, as a collective, manage [consensus](#consensus) on a
[blockchain](#blockchain) network. In a [proof-of-stake](#nominated-proof-of-stake-npos) network
(such as one using [the Staking pallet](../runtime/frame#staking) from [FRAME](#frame)), authorities
are determined through a token-weighted nomination/voting system.

> The terms "authorities" and "[validators](#validator)" may sometimes seem to refer the same thing.
> "Validators" is a broader term that can include other aspects of chain maintenance such as
> parachain validation. In general authorities are a (non-strict) subset of validators and many
> validators will be authorities.

## Aura (aka "Authority Round")

Deterministic [consensus](#consensus) protocol where [block](#block) production is limited to a
rotating list of [authorities](#authority) that take turns creating blocks; the majority of online
authorities are assumed to be honest. Learn more by reading
[the official wiki article](https://openethereum.github.io/wiki/Aura) for the Aura consensus
algorithm.

### Aurand

A variant of [Aura](#aura) where [authorities](#authority) are shuffled randomly on each round,
increasing security.

### Aurand/Ouroboros

Extension of [Aurand](#aurand) where block production involves [authorities](#authority) competing
over limited slots that move very quickly; most slots are not populated, albeit with rare slot
collisions.

### Aura + GRANDPA

A hybrid [consensus](#consensus) scheme where [Aura](#aura) is used for block production and
short-term probabilistic [finality](#finality), with deterministic finality provided through
[GRANDPA](#grandpa).

---

## Blind Assignment of Blockchain Extension (BABE)

[Block authoring](#author) protocol similar to [Aura](#aura), however [authorities](#authority) win
[slots](#slot) based on a verifiable random function (VRF) as opposed to Aura's round-robin
selection method. The winning authority can select a chain and submit a new block for it. Learn more
about BABE by referring to its
[official Web3 Foundation research document](https://w3f-research.readthedocs.io/en/latest/polkadot/BABE.html).

## Block

A single element of a blockchain that [cryptographically](#cryptographic-primitives) binds a set of
[extrinsic](#extrinsic) data (the "body") to a "[header](#header)". Blocks are arranged into a tree
through parent pointers (implemented as a hash of the parent) and the tree is pruned into a list via
a [fork-choice rule](../advanced/consensus#fork-choice-rules), and optional
[finality gadget](#finality).

## Blockchain

A blockchain is a distributed network of computers that uses
[cryptography](#cryptographic-primitives) to allow a group of participants to trustlessly come to
[consensus](#consensus) on the [state](#state) of a system as it evolves over time. The computers
that compose the blockchain network are called [nodes](#node).

## Byzantine Fault Tolerance (BFT)

The ability of a distributed computer system to remain operational in the face of a proportion of
defective [nodes](#node) or [actors](#authority). "Byzantine" refers to the ultimate level of
defectiveness, with such nodes assumed to be actively malicious and coordinating rather than merely
offline or buggy. Typically, BFT systems remain functional with up to around one-third of Byzantine
nodes.

### Byzantine Failure

The loss of a system service due to a Byzantine Fault (i.e. components in the system fail and there
is imperfect information about whether a component has failed) in systems that require consensus.

---

## Consensus

In the context of a [blockchain](#blockchain), consensus is the process nodes use to agree on the
canonical [fork](#fork) of a chain. Consensus is comprised of [authorship](#author),
[finality](#finality), and [fork-choice rule](../advanced/consensus#fork-choice-rules). In the
Substrate ecosystem, these three components are cleanly separated from one another, and the term
consensus often refers specifically to authorship.

### Consensus Engine

A subsystem of a Substrate [node](#node) that is responsible for consensus tasks.

### Consensus Algorithms

An algorithm that is able to ensure that a set of [actors](#authority), who don't necessarily trust
each other, can come to consensus over some computation. Often mentioned alongside "**safety**" (the
ability to ensure that any progression will eventually be agreed as having happened by all honest
nodes) and "**liveness**" (the ability to keep making progress). Many consensus algorithm are
referred to as being [Byzantine-fault-tolerant](#byzantine-fault-tolerance-bft).

There is
[a comprehensive blog series](https://polkadot.network/polkadot-consensus-part-1-introduction/) that
provides a deep dive into the consensus strategies of [the Polkadot Network](#polkadot-network).

## Cryptographic Primitives

A term that refers to concepts like signature schemes and hashing algorithms. Cryptographic
primitives are essential to many aspects of the Substrate ecosystem:

- [Blockchains](#blockchain): [blocks](#block) must be hashed under some algorithm and reference
  their parent block's hash.
- [State](#state): Substrate storage is encoded as a [trie](#trie-patricia-merkle-tree), a data
  structure that uses hashing to facilitate efficient verification.
- [Consensus](#consensus): [authorities](#authority) often use digital signature schemes of some
  kind.
- [Transaction](#transaction) authentication: in [runtimes](#runtime) where transactions and
  [accounts](../learn-substrate/account-abstractions) are used, accounts are identified and
  authenticated through the use of cryptography.

## Council

The term "Council" is used on a number of Substrate-based networks, such as [Kusama](#kusama) and
[Polkadot](#polkadot) to refer to an instance of
[the Collective pallet](../runtime/frame#collective) that is used as a part of the network's
[FRAME](#frame)-based [runtime](#runtime). The Council primarily serves as a body to optimize and
check/balance the more inclusive referendum system.

---

## Database Backend

The means by which the [state](#state) of a [blockchain](#blockchain) network is persisted between
invocations of the [blockchain node](#node) application. There is
[documentation](../advanced/storage) that explains the implementation of the database backend that
is used by Substrate-based chains.

## Dev Phrase

A
[mnemonic phrase](https://en.wikipedia.org/wiki/Mnemonic#For_numerical_sequences_and_mathematical_operations)
that is intentionally made public. All of the
[well-known development accounts](../integrate/subkey#well-known-keys) (Alice, Bob, Charlie, Dave,
Ferdie, and Eve) are generated from the same dev phrase. The dev phrase is:
`bottom drive obey lake curtain smoke basket hold race lonely fit walk`.

Many tools in the Substrate ecosystem, such as [`subkey`](../integrate/subkey), allow users to
implicitly specify the dev phrase by only specifying a derivation path such as `//Alice`.

## Digest

An extensible field of the [block header](#header) that encodes information needed by several actors
in a blockchain network including, [light clients](#light-client) for chain synchronization,
consensus engines for block verification, and the runtime itself in the case of pre-runtime digests.

## Dispatch

A dispatch is the execution of a function with a pre-defined set of arguments. In the context of
[runtime](#runtime) development with [FRAME](#frame), this refers specifically to the "runtime
dispatch" system, a means of taking some pure data (the type is known as `Call` by convention) and
interpreting it in order to call a published function in a runtime module ("[pallet](#pallet)") with
some arguments. Such published functions take one additional parameter, known as
[`origin`](#origin), that allows the function to securely determine the provenance of its execution.

---

## Equivocating

Voting or otherwise backing multiple mutually-exclusive options within the consensus mechanism. This
is considered fundamentally Byzantine behaviour.

## Ethash

One of a number of proofs of work, to be used in a Proof-of-Work (PoW) consensus algorithm.
Originally developed for, and used in, Ethereum by a team led by Tim Hughes.

## Events

A means of recording, for the benefit of the off-chain world, that some particular state transition
has happened. Within the context of the SRML, events are one of a number of amalgamatable datatypes
that each module defines individually and which are aggregated together into a single overall `enum`
type that can represent all module's types. Events are implemented through a transient set of
storage items which are inspected immediately after a block has executed and reset during
block-initialisation.

## Executor

A means of executing a function call in a given runtime with a set of externalities. There are two
executor implementations present in Substrate, _Wasm_ and _Native_.

### Wasm Executor

An Executor that uses the Wasm binary and a Wasm interpreter to execute the needed call. This tends
to be slow but is guaranteed correct.

### Native Executor

An Executor that uses the current inbuilt and natively compiled runtime to execute the needed call.
If the code is compatible with the on-chain Wasm code, then it will be a lot faster and correct.
Incorrect versioning will result in a consensus error.

## Extrinsic

A piece of data bundled into a block that expresses something from the "external" (i.e. off-chain)
world. There are, broadly speaking, two types of extrinsic: transactions (which tend to be signed)
and inherents (which don't).

## Existential Deposit

Within the SRML Balances module, this is the minimum balance an account may have. Accounts cannot be
created with a balance less than some minimal amount, and if an account's balance ever drops below
amount, then it is removed entirely from the system.

> As long as both the sender and receiver keep a balance of at least the existential deposit,
> transfers, including of very small amounts, will work intuitively. However, an attempt to transfer
> a small balance from one account to another can have slightly less-than-intuitive consequences
> when either the sender or receiver balances are very low.
>
> If the amount transferred is less than the existential deposit and the destination account did not
> previously exist, then the transfer will "succeed" without actually creating and crediting the
> destination account; this appears to essentially just burn the transfer balance from the sender.
> If the transfer takes the sender to below the existential balance, then its account will be
> deleted. In this way, a transfer can even "successfully" result in the sender account being
> completely deleted, with the receiver account never being created.
>
> It is up to middleware to ensure that end-users are made aware of and/or protected from these edge
> cases.

---

## Finality

A part of consensus dealing with making a progression be irreversible. If a block is finalised, then
any real-world repercussions can be effected. The consensus algorithm must guarantee that finalised
blocks never need reverting.

One example of a work in progress provable finality gadget is being used in Polkadot:
[GRANDPA](#grandpa).

See also: [Aurand+GRANDPA](#aurand-grandpa), [Instant Finality](#instant-finality),
[Proof-of-Finality](#proof-of-finality), [Probabilistic Finality](#probabilistic-finality),
[Provable Finality](#provable-finality)

## Fork

Forks occur when two [blocks](#block) have the same parent. Forks must be
[resolved](../advanced/consensus#fork-choice-rules) so that only one canonical chain exists.

## Flaming Fir

Flaming Fir is a [Parity](https://www.parity.io/)-maintained Substrate-based
[blockchain](#blockchain) that exists for developing and testing the Substrate blockchain
development framework.

## FRAME

[FRAME](../runtime/frame) is Substrate's system for [**runtime**](#runtime) development. The name is
an acronym for the "Framework for Runtime Aggregation of Modularized Entities". FRAME allows
developers to create blockchain runtimes by composing modules, called "[pallets](#pallet)". Runtime
developers interact with FRAME by way of a [macro](#macro) language that makes it easy for
developers to define custom pallets (e.g. [`decl_event!`](../runtime/macros#decl_event),
[`decl_error!`](../runtime/macros#decl_error), [`decl_storage!`](../runtime/macros#decl_storage),
[`decl_module!`](../runtime/macros#decl_module) and compose pallets (e.g.
[`construct_runtime!`](../runtime/macros#construct_runtime) into a working runtime that can easily
be used to power a Substrate-based blockchain. The convention used in
[the Substrate codebase](https://github.com/paritytech/substrate/tree/master/frame) is to preface
FRAME's core modules with `frame_` and the optional pallets with `pallet_*`. For instance, the
macros mentioned above are all defined in the [`frame_support`](../runtime/frame#support-library)
module and all FRAME-based runtimes _must_ include the
[`frame_system`](../runtime/frame#system-library) module. Once the
`frame_support::construct_runtime` macro has been used to create a runtime that includes the
`frame_system` module, optional pallets such as the [Balances](../runtime/frame#balances) pallet may
be used to extend the runtimes core capabilities.

## Full Client

A node able to synchronise a block chain in a maximally secure manner through execution (and thus
verification) of all logic. Compare to Light Client.

---

## Genesis Configuration

A JSON-based configuration file that can be used to determine a genesis block and which thus allows
a single blockchain runtime to underpin multiple independent chains. Analogous to a "chain spec"
file in Parity Ethereum, and, when used with Substrate Node, could be considered the third and
highest-level usage paradigm of Substrate. The SRML provides a means of automatically generating the
chain configuration logic from the modules and their persistent storage items.

## GRANDPA

GRANDPA (GHOST-based Recursive ANcestor Deriving Prefix Agreement), also previously known as SHAFT
(SHared Ancestry Finality Tool), and originally known as AfG, is a finality gadget for blockchains,
implemented in Rust. The formal specification is published at
https://github.com/w3f/consensus/blob/master/pdf/grandpa-old.pdf.

---

## Header

Pieces of primarily [cryptographic information](#cryptographic-primitives) that summarize a block.
This information is used by [light-clients](#light-client) to get a minimally-secure but very
efficient synchronization of the chain.

## Hybrid Consensus Protocol

Split blockchain consensus into Block Production and a Finality Gadget. This allows chain growth
speed to be as fast as in probabilistic "safety" consensus such as Ouroboros or Aurand but with same
level of security guarantees as in Instant-Finality Consensus Protocols. See
[the first implementation in Rust](https://github.com/paritytech/finality-afg), and
[the GRANDPA article](https://github.com/w3f/consensus/blob/master/pdf/grandpa-old.pdf).

---

## Instant-Finality

A non-probabilistic consensus protocol that gives a guarantee of finality immediately upon block
production, for example Tendermint and Rhododendron. These tend to be PBFT based and thus very
expensive in terms of communication requirements.

---

## JSON-RPC

A standard to call functions on a remote system using a JSON protocol. For Substrate, this is
implemented through the [Parity JSONRPC](https://github.com/paritytech/jsonrpc) crate.

### JSON-RPC Core Crate

Allows creation of JSON-RPC server handler, with supported methods registered. Exposes the Substrate
Core via different types of Transport Protocols (i.e. WS, HTTP, TCP, IPC)

### JSON-RPC Macros Crate

Allows simplifying in code the creation process of the JSON-RPC server through creating a Rust Trait
that is annotated with RPC method names, so you can just implement the methods names

### JSON-RPC Proxy Crate

Expose a simple server such as TCP from binaries, with another binary in front to serve as a proxy
that will expose all other Transport Protocols, and process incoming RPC calls before reaching an
upstream server, making it possible to implement Caching Middleware (saves having to go all the way
to the node), Permissioning Middleware, load balancing between node instances, or moving account
management to the proxy which processes the signed transaction. This provides an alternative to
embedding the whole JSON-RPC in each project and all the configuration options for each server.

### JSON-RPC PubSub Crate

Custom (though conventional) extension that is useful for Dapp developers. It allows "subscriptions"
so that the server sends notifications to the client automatically (instead of having to call and
poll a remote procedure manually all the time) but only with Transport Protocols that support
persistent connection between client and server (i.e. WS, TCP, IPC)

---

## Keystore

A subsystem in Substrate for managing keys for the purpose of producing new blocks.

## Kusama

[Kusama](https://kusama.network/) is a Substrate-based [blockchain](#blockchain) that implements a
design similar to the [Polkadot Network](#polkadot-network). Kusama is a
"[canary](https://en.wiktionary.org/wiki/canary_in_a_coal_mine)" network and is referred to as
[Polkadot's "wild cousin"](https://polkadot.network/kusama-polkadot-comparing-the-cousins/). The
differences between a canary network and a true test network are related to the expectations of
permanence and stability; although Kusama is expected to be more stable than a true test network,
like [Westend](#westend), it should not be expected to be as stable as an enterprise production
network like [Polkadot](#polkadot). Unlike Westend, which is maintained by
[Parity Technologies](https://www.parity.io/), Kusama (like Polkadot) is
[controlled by its network participants](../runtime/frame#democracy). The level of stability offered
by canary networks like Kusama is intended to encourage meaningful experimentation.

---

## Libp2p Rust

Peer-to-peer networking library. Based on Protocol Labs' Libp2p implementations in Go and
JavaScript, and their (somewhat incomplete) specifications. Allows use of many transport protocols
including WebSockets (usable in a web browser).

## Light Client

A light client is a type of blockchain [node](#node) that does not store the [chain state](#state)
or produce ([author](#author)) blocks. It encapsulates basic capabilities for verifying
[cryptographic primitives](#cryptographic-primitives) and exposes an
[RPC (remote procedure call)](https://en.wikipedia.org/wiki/Remote_procedure_call) server to allow
blockchain users to interact with the blockchain network.

---

## Macro

Macros are features of some programming languages,
[including Rust](https://doc.rust-lang.org/1.7.0/book/macros.html), that allow developers to "write
code that writes code". [FRAME](#frame) provides a number of [macros](../runtime/macros) that make
it easy to compose a [runtime](#runtime).

## Metadata

Information capture allowing external code to introspect runtime data structures. Includes
comprehensive descriptions of the dispatch functions, events and storage items for each module in
the runtime.

---

## Node

A node correlates to a running instance of a blockchain client; it is part of the
[peer-to-peer](https://en.wikipedia.org/wiki/Peer-to-peer) network that allows blockchain
participants to interact with one another. Substrate nodes can fill a number of roles in a
blockchain network. For instance, [validators](#validator) are the block-producing nodes that power
the blockchain, while [light-clients](#light-client) facilitate scalable interactions in
resource-constrained environments like [UIs](https://github.com/paritytech/substrate-connect) or
embedded devices.

## Nominated Proof-of-Stake (NPoS)

A means of determining a set of [validators](#validator) (and thus [authorities](#authority)) from a
number of accounts willing to commit their stake to the proper (non-[Byzantine](#byzantine-failure))
functioning of one or more [authoring](#author)/validator nodes. The Polkadot protocol describes
validator selection as a constraint optimization problem to eventually give a maximally staked set
of validators each with a number of supporting nominators lending their stake. Slashing and rewards
are done in a pro-rata manner.

---

## OAS3

OpenAPI Specification 3 (OAS3), which was formally referred to as a Swagger API Specification, is
the specification used to author a Swagger File in either JSON or YAML format that may be used to
generate API Reference documentation.

## Origin

The provenance of a dispatched function call into the runtime. Can be customised (e.g. the Council
"Motion" origin), but there are two special "built-in"s:

- Root: system level origin, assumed to be omnipotent;
- Signed: transaction origin, includes the account identifier of the signer;

---

## Parachain

A parachain is a [blockchain](#blockchain) that derives shared infrastructure and security from a
"[relay chain](#relay-chain)". You can
[learn more about parachains on the Polkadot Wiki](https://wiki.polkadot.network/docs/en/learn-parachains).

## Pallet

A module that can be used to extend the capabilities of a [FRAME](#frame)-based [runtime](#runtime).
Pallets bundle domain-specific logic along with related runtime primitives like [events](#event),
and [storage items](#storage-items).

## Polkadot Network

The [Polkadot Network](https://polkadot.network/) is a [blockchain](#blockchain) that serves as the
central hub of a heterogeneous blockchain network. It serves the role of
"[relay chain](#relay-chain)" and supports the other chains (the "[parachains](#parachain)") by
providing shared infrastructure and security. The Polkadot Network is progressing through a
[multi-phase launch process](https://polkadot.network/explaining-the-polkadot-launch-process/) and
does not currently support parachains.

## Practical Byzantine Fault Tolerance (pBFT)

An original method to address the Byzantine Generals Problem. This allows for a system tolerant to
Byzantine behaviour from up to one third of its participants with an `O(2N**2)` communications
overhead per node.

## Probabilistic Finality

In a probabilistic finality based chain (e.g. Bitcoin), network participants rely on some
probability p that a proposed block B will remain in the canonical chain indefinitely, with p
approaching 1 as further blocks are produced on top of the block B.

## Proof-of-Finality

A piece of data that can be used to prove that a particular block is finalised. Potentially very
large unless signature aggregation is used.

## Provable Finality

Some consensus mechanisms aim for provable finality, whereby all blocks are guaranteed to be the
canonical block for that chain upon block inclusion. Provable finality is desirable in cases such as
when light clients do not have the full chain state, or when communicating with other chains, where
interchain data is not ubiquitously distributed. See: [GRANDPA](#grandpa)

---

## Relay Chain

The central hub in a heterogenous ("chain-of-chains") network. Relay chains are
[blockchains](#blockchain) that provide shared infrastructure and security to the other blockchains
in the network (the "[parachains](#parachain)"). In addition to providing [consensus](#consensus)
capabilities, relay chains also allow parachains to communicate and exchange digital assets without
needing to trust one another.

## Rhododendron

An Instant-Finality BFT consensus algorithm, one of a number of adaptions of PBFT for the
blockchain. Others include Stellar's consensus algorithm and Tendermint. See the
[Rhododendron crate](https://github.com/paritytech/rhododendron).

## Rococo

Rococo is the [Polkadot](#polkadot) Network's [parachain](#parachain) test network. It is a
Substrate-based [blockchain](#blockchain) that is an evolving testbed for the capabilities of
heterogeneous blockchain networks.

## Runtime

The block execution logic of a blockchain, i.e. the state transition function. In Substrate, this is
stored on-chain in an implementation-neutral, machine-executable format as a WebAssembly binary.
Other systems tend to express it only in human-readable format (e.g. Ethereum) or not at all (e.g.
Bitcoin).

---

## SHAFT

SHAFT (SHared Ancestry Finality Tool). See [GRANDPA](#grandpa).

## Slot

A fixed, equal interval of time used by consensus engines such as [Aura](#aura-aka-authority-round)
and [BABE](#blind-assignment-of-blockchain-extension-babe). In each slot, a subset of
[authorities](#authority) is permitted (or obliged, depending on the engine) to [author](#author) a
[block](#block).

## Stake-Weighted Voting

Democratic system with one-vote-per-token, rather than one-vote-per-head.

## State

The data that can be drawn upon by, and that persists between, the executions of sequential blocks.
State is stored in a "Trie", a cryptographic immutable data-structure that makes incremental digests
very efficient. In Substrate, this trie is exposed to the runtime as a simple key/value map where
both keys and values can be arbitrary byte arrays.

## SRML (Substrate Runtime Module Library)

An extensible, generic, configurable and modular system for constructing runtimes and sharing
reusable components of them. Broadly speaking, this corresponds to the second usage paradigm of
Substrate, higher-level than using Substrate Core, but lower-level than simply running Substrate
Node with a custom configuration.

## STF (State Transition Function)

The logic of a blockchain that determines how the state changes when any given block is executed. In
Substrate, this is essentially equivalent to the Runtime.

## Storage Items

Within the SRML, storage items are a means of providing type-safe persistent data for the runtime,
achieved with a compiler macro, the `parity-codec` crate and the State API. All storage items must
have a type for which the `parity-codec::Codec` trait is implemented, and, if they have a
corresponding JSON Genesis Configuration entry, then also the `serde` traits.

## Substrate

A framework and toolkit for building and deploying upgradable, modular and efficient blockchains.
There are three usage paradigms in increasing levels of functionality and opinionation: Core, SRML
and Node.

### Substrate Core

The lowest level of the three Substrate usage paradigms, this is a minimalist/purist blockchain
building framework that contains essential functionality at the lowest level including consensus,
block production, chain synchronisation, I/O for JSON-RPC, runtime, network synchronisation,
database backend, telemetry, sandboxing, and versioning.

### Substrate Execution Environment

The runtime environment under which WebAssembly code runs in order to execute blocks.

---

## Transaction

A type of Extrinsic that includes a signature, and all valid instances cost the signer some amount
of tokens when included on-chain. Because validity can be determined efficiently, transactions can
be gossipped on the network with reasonable safety against DoS attacks, much as with Bitcoin and
Ethereum.

## Transaction Era

A definable period, expressed as a range of block numbers, where a transaction may validly be
included in a block. Eras are a backstop against transaction replay attacks in the case that an
account is reaped and its (replay-protecting) nonce is reset to zero. Eras are efficiently
expressible in transactions and cost only two bytes.

See [reclaiming an account](https://github.com/paritytech/substrate/wiki/Reclaiming-an-index).

## Transaction Pool

A collection of transactions that are not yet included in blocks but have been determined to be
valid.

### Tagged Transaction Pool

A "generic" transaction pool implementation allowing the runtime to specify whether a given
transaction is valid, how it should be prioritised and how it relates to other transactions in terms
of dependency and mutual exclusivity. It is designed to be easily extensible and general enough to
have both UTXO and account-based transaction modules be trivially expressible.

## Trie (Patricia Merkle Tree)

An immutable cryptographic data-structure typically used to express maps or sets of items where:

- a cryptographic digest of the dataset is needed; and/or
- it is cheap to recompute the digest with incremental changes to the dataset even when it is very
  large; and/or
- a concise proof that the dataset contains some item/pair (or lacks it) is needed.

---

## Validator

A semi-trusted (or untrusted but well-incentivised) actor that helps maintain the network. In
Substrate, validators broadly correspond to the [authorities](#authority) running the consensus
system. In Polkadot, validators also manage other duties such as guaranteeing data availability and
validating parachain candidate blocks.

See https://wiki.parity.io/Validator-Set.html

---

## WebAssembly (Wasm)

An execution architecture based upon a virtual machine that allows for the efficient, platform
neutral expression of deterministic machine-executable logic. Wasm is used across the Web platform
and well-tooled and easily compiled from Rust.

## Westend

Westend is a [Parity](https://www.parity.io/)-maintained, Substrate-based [blockchain](#blockchain)
that serves as the test network for [the Polkadot Network](#polkadot).

---
