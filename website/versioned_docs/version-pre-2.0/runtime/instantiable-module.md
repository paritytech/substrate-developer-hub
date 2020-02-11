---
title: Instantiable Modules
id: version-pre-2.0-instantiable-module
original_id: instantiable-module
---

Unlike other runtime modules, instantiable modules enable multiple instances of the same module logic within a single runtime. Each instance of the module has its own independent storage, and extrinsics must specify which instance of the module they are intended for.

Some use cases:

* Token chain hosts two independent cryptocurrencies.
* Marketplace track users' reputations as buyers separately from their reputations as sellers.
* Governance has two (or more) houses which act similarly internally.

The FRAME's Balances and Collective pallets are good examples of real-world code using this technique. The default Substrate node has two instances of the Collectives module that make up its Council and Technical Committee. Each collective has its own storage, events, and configuration.

```rust
Council: collective::<Instance1>::{Module, Call, Storage, Origin<T>, Event<T>, Config<T>},
TechnicalCommittee: collective::<Instance2>::{Module, Call, Storage, Origin<T>, Event<T>, Config<T>}
```

## Writing an Instantiable Module
Writing an instantiable module is almost entirely the same process as writing a plain non-instantiable module. There are just a few places where the syntax differs. If you prefer video walkthroughs, you can see a [recording](https://www.youtube.com/watch?v=XEl59hVcyI8) of making these changes.

> You must call `decl_storage!`
>
> Instantiable modules _must_ call the `decl_storage!` macro so that the `Instance` type is created.

### Configuration Trait
```rust
pub trait Trait<I: Instance>: system::Trait {
	// TODO: Add other types and constants required configure this module.

	/// The overarching event type.
	type Event: From<Event<Self, I>> + Into<<Self as system::Trait>::Event>;
}
```

### Storage Declaration
```rust
decl_storage! {
	trait Store for Module<T: Trait<I>, I: Instance> as TemplateModule {
		...
	}
}
```

### Declaring the Module Struct
```rust
decl_module! {
	/// The module declaration.
	pub struct Module<T: Trait<I>, I: Instance> for enum Call where origin: T::Origin {
		...
	}
}
```
### Accessing Storage
```rust
<Something<T, I>>::put(something);
```

<!-- In v2.0 the T is omitted for both instantiable and non-instantiable modules
<Something<I>>::put(something); -->

### Event initialization
```rust
fn deposit_event<T, I>() = default;
```

### Event Declaration
```rust
decl_event!(
	pub enum Event<T, I> where AccountId = <T as system::Trait>::AccountId {
		...
	}
}
```

## Installing a Module Instance in a Runtime

The syntax for including an instance of an instantiable module in a runtime is slightly different than for a regular module. The only exception is for modules that use the [Default Instance](#defualt-instance) feature described below.

### Implementing Configuration Traits
Each instance needs to be configured separately. Configuration consists of implementing the specific instance's trait. The following snippet shows a configuration for `Instance1`.
```rust
impl template::Trait<template::Instance1> for Runtime {
	type Event = Event;
}
```

### Using the `construct_runtime!` Macro
The final step of installing the module instance in your runtime is updating the `construct_runtime!` macro. You may give each instance a meaningful name. Here I've called `Instance1` `FirstTemplate`.
```rust
FirstTemplate: template::<Instance1>::{Module, Call, Storage, Event<T>, Config},
```


## Default Instance
One drawback of instantiable modules, as we've presented them so far is that they require the runtime designer to use the more elaborate syntax even if they only desire a single instance of the module. To alleviate this inconvenience, Substrate provides a feature known as DefaultInstance. This allows runtime developers to deploy an instantiable module exactly as they would if it were not instantiable provided they **only use a single instance**.

To make your instantiable module support DefaultInstance, you must specify it in three places.

```rust
pub trait Trait<I=DefaultInstance>: system::Trait {
```

```rust
decl_storage! {
  trait Store for Module<T: Trait<I>, I: Instance=Instance> as TemplateModule {
    ...
  }
}
```

```rust
decl_event!(
	pub enum Event<T, I=DefaultInstance> where ... {
    ...
  }
}
```

Having made these three changes, a developer who uses your module doesn't need to know or care that your module is instantable. They can deploy it just as they would any other module.

## Genesis Configuration
Some modules require a genesis configuration to be specified. Let's look to the default Substrate node's use of the Collective module as an example.

In its `chain_spec.rs` file we see
```rust
GenesisConfig {
	...
	collective_Instance1: Some(CouncilConfig {
		members: vec![],
		phantom: Default::default(),
	}),
	collective_Instance2: Some(TechnicalCommitteeConfig {
		members: vec![],
		phantom: Default::default(),
	}),
	...
}
```
