---
title: "Installing Substrate"
---

## Full Installation

If you're running Mac OS, Arch, or a Debian-based OS like Ubuntu, then **with a good internet connection** run this simple one-liner:

```bash
curl https://getsubstrate.io -sSf | bash
```

This command will download and compile the complete substrate node, and the subkey utility and install them on your path. It will also install the substrate-up scripts for quickly creating your own nodes and modules.

It will take 20 - 40 minutes to finish. Once it is done, check that Substrate is properly installed by running `substrate --version`. You should see something like this:
```
$ substrate --version
substrate 2.0.0-6f0d28863-x86_64-macos
```

If you get that, then you're ready to proceed!

## Fast Installation

If you plan to create your own substrate node, and don't need to compile the entire standard node, you may run the faster version of the installation.

```bash
curl https://getsubstrate.io -sSf | bash -s -- --fast
```

This command will still install the substrate-up commands for creating your own nodes and modules, but will not spend time compiling the default substrate node or subkey utility.

## Manual Build

If you want to hack on substrate itself, or manually build the node, you can get the code with
```
git clone https://github.com/paritytech/substrate.git
```

Then you can build the node with
```
# Update your rust toolchain
./scripts/init.sh

# Build the wasm runtime
./scripts/build.sh

# Build the native node
cargo build
```

You can also build the subkey utility with
```
cargo build -p subkey
```
Much more information is available in the [project readme](https://github.com/paritytech/substrate/#substrate).
