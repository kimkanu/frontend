# @kimkanu/frontend

## Installation

```
npm install @kimkanu/frontend
```
or
```
yarn add @kimkanu/frontend
```

## Usage

Refer to `examples/` directory.

### Recoil.js

```typescript
import { RecoilStateFamily, setWithGuard } from "@kimkanu/frontend";
import { atom, selector, selectorFamily } from "recoil";

type ExampleStateType = number[]; // Actual datatype of a state
type ExampleSelector = {
  doubled: ["w", number[]]; // Writable, returns `number[]`
  asString: ["r", string[]]; // Readonly, returns `string[]`
  byIndex: ["w", (index: number) => number]; // Writable selector family indexed by `number` returning `number`
  asStringByIndex: ["r", (index: number) => string]; // Readonly selector family indexed by `number` returning `string`
};

const exampleStateFamily: RecoilStateFamily<ExampleStateType, ExampleSelector> =
  {
    atom: atom({
      key: "example",
      default: [],
    }),
    doubled: selector({
      key: "example__doubled",
      get: ({ get }) => get(exampleStateFamily.atom).map((x) => x * 2),
      set: setWithGuard(({ set }, value) => {
        set(
          exampleStateFamily.atom,
          value.map((x) => x / 2)
        );
      }),
    }),
    asString: selector({
      key: "example__asString",
      get: ({ get }) => get(exampleStateFamily.atom).map((x) => x.toString()),
    }),
    byIndex: selectorFamily({
      key: "example__byIndex",
      get:
        (index) =>
        ({ get }) =>
          get(exampleStateFamily.atom)[index],
      set: (index) =>
        setWithGuard(({ get, set }, value) => {
          const currentState = get(exampleStateFamily.atom);
          set(exampleStateFamily.atom, [
            ...currentState.slice(0, index),
            value,
            ...currentState.slice(index + 1),
          ]);
        }),
    }),
    asStringByIndex: selectorFamily({
      key: "example__asStringByIndex",
      get:
        (index) =>
        ({ get }) =>
          get(exampleStateFamily.atom)[index].toString(),
    }),
  };
```
