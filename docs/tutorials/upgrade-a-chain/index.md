---
title: Introduction
---

One of the defining features of the Substrate blockchain development framework is its support for
**forkless runtime upgrades**. Forkless upgrades are a means of enhancing a blockchain runtime in a
way that is supported and protected by the capabilities of the blockchain itself. A blockchain's
[runtime](../../knowledgebase/runtime) defines the [state](../../knowledgebase/runtime/storage) the
blockchain can hold and also defines the logic for effecting changes to that state. Substrate makes
it possible to deploy enhanced runtime capabilities (including _breaking_ changes) without a
[hard fork](../../knowledgebase/getting-started/glossary#fork). Because the definition of the
runtime is itself an element in a Substrate chain's state, network participants may update this
value by way of an [extrinsic](../../knowledgebase/learn-substrate/extrinsics),
[the `set_code` function](https://substrate.dev/rustdocs/v2.0.0/frame_system/enum.Call.html#variant.set_code).
Since updates to runtime state are bound by the blockchain's consensus mechanisms and cryptographic
guarantees, network participants can use the blockchain itself to trustlessly distribute updated or
extended runtime logic without needing to fork the chain or even release a new blockchain client.

This tutorial will use the Substrate Developer Hub
[Node Template](https://github.com/substrate-developer-hub/substrate-node-template) to explore two
mechanisms for forkless upgrades of [FRAME](../../knowledgebase/runtime/frame)-based runtimes.
First, the
[`sudo_unchecked_weight`](https://substrate.dev/rustdocs/v2.0.0/pallet_sudo/enum.Call.html#variant.sudo_unchecked_weight)
function from the [Sudo pallet](../../knowledgebase/runtime/frame#sudo) will be used to perform an
upgrade that adds the [Scheduler pallet](../../knowledgebase/runtime/frame#scheduler). Then, the
[`schedule`](https://substrate.dev/rustdocs/v2.0.0/pallet_scheduler/enum.Call.html#variant.schedule)
function from the Scheduler pallet will be used to perform an upgrade that increases the
[existential (minimum) balance](../../knowledgebase/getting-started/glossary#existential-deposit)
for network accounts.

If you have problems with this tutorial, the Substrate community is full of helpful resources. We
maintain an active
[#SubstrateTechnical chat room](https://app.element.io/#/room/!HzySYSaIhtyWrwiwEV:matrix.org) and
monitor the
[`substrate` tag on Stack Overflow](https://stackoverflow.com/questions/tagged/substrate). You can
also use the [`subport` GitHub repository](https://github.com/paritytech/subport/issues/new) to
create an Issue.

## The Node Template

If you haven't already, you should complete the first two tutorials. The
[Create Your First Substrate Chain](../../tutorials/create-your-first-substrate-chain/) tutorial
will guide you through the process of setting up your development environment. The
[Add a Pallet to Your Runtime](../../tutorials/add-a-pallet) tutorial will introduce the FRAME
system for runtime development and guide you through the process of extending the capabilities of a
FRAME runtime by adding a pallet. If you're an experienced developer and wish to skip those
tutorials, you can clone the
[Node Template repository](https://github.com/substrate-developer-hub/substrate-node-template) and
refer to the
[documentation for local development](https://github.com/substrate-developer-hub/substrate-node-template#local-development).
