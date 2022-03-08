import {
  DefaultValue,
  GetRecoilValue,
  RecoilState,
  RecoilValueReadOnly,
  ResetRecoilState,
  SetRecoilState,
} from "recoil";

const guardRecoilDefaultValue = (candidate: any): candidate is DefaultValue => {
  if (candidate instanceof DefaultValue) return true;
  return false;
};

export const setWithGuard = <StateType>(
  setter: (
    opts: {
      set: SetRecoilState;
      get: GetRecoilValue;
      reset: ResetRecoilState;
    },
    newValue: StateType
  ) => void
): ((
  opts: {
    set: SetRecoilState;
    get: GetRecoilValue;
    reset: ResetRecoilState;
  },
  newValue: StateType | DefaultValue
) => void) => {
  return ({ set, get, reset }, newValue) => {
    if (guardRecoilDefaultValue(newValue)) return;
    setter({ set, get, reset }, newValue);
  };
};

type RecoilSelectorType<ReadWriteFlag, StateType> = ReadWriteFlag extends "r"
  ? RecoilValueReadOnly<StateType>
  : ReadWriteFlag extends "w"
  ? RecoilState<StateType>
  : never;

export type RecoilStateFamily<T, Selectors> = {
  atom: RecoilState<T>;
} & {
  [key in keyof Selectors]: Selectors[key] extends [
    infer ReadWriteFlag,
    infer SelectorStateType
  ]
    ? SelectorStateType extends (param: infer Parameter) => infer ReturnType
      ? (param: Parameter) => RecoilSelectorType<ReadWriteFlag, ReturnType>
      : RecoilSelectorType<ReadWriteFlag, SelectorStateType>
    : never;
};
