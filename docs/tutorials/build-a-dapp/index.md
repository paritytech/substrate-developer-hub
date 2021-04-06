---
title: Introduction
---

In this tutorial, you will learn to create a custom
["Proof of Existence"](https://en.wikipedia.org/wiki/Proof_of_Existence) dApp using the Substrate
blockchain development framework and the [FRAME](../../knowledgebase/runtime/frame) library.


This tutorial should take you about **1 hour** to complete (can you believe that Substrate
enables you to do this in such a tiny amount fo time?!). We will be using the
[Rust programming language](https://www.rust-lang.org/) and [ReactJS](https://reactjs.org/), but you
do not need to know these to be able to complete this guide. We will provide you with working code
snippets and explain what all the code does at a high level.

We only expect that:

- You have completed the
  [Create Your First Substrate Chain Tutorial](../../tutorials/create-your-first-substrate-chain).
- You are generally familiar with software development, writing code, and running your code.
- You are open to learning about the bleeding edge of blockchain development.

If you run into an issue on this tutorial, **we are here to help!** You can
[ask a question on Stack Overflow](https://stackoverflow.com/questions/tagged/substrate) and use the
`substrate` tag or ask your questions directly in the [Substrate Technical Channel](https://matrix.to/#/#substrate-technical:matrix.org).

## What you will be doing

Before we even get started, let's lay out what we'll be doing in this tutorial. Step by step, we will:

1. Launch a Substrate blockchain based on a node template.
2. Modify the node template to add our own **custom PoE pallet from scratch** and implement our PoE API.
3. Modify the front-end template to add a **custom user interface** that interacts with our PoE API.

Sound reasonable? Good, then let's begin!
