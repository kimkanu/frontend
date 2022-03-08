import { DefaultValue, GetRecoilValue, RecoilState, RecoilValueReadOnly, ResetRecoilState, SetRecoilState } from "recoil";
export declare const setWithGuard: <StateType>(setter: (opts: {
    set: SetRecoilState;
    get: GetRecoilValue;
    reset: ResetRecoilState;
}, newValue: StateType) => void) => (opts: {
    set: SetRecoilState;
    get: GetRecoilValue;
    reset: ResetRecoilState;
}, newValue: DefaultValue | StateType) => void;
declare type RecoilSelectorType<ReadWriteFlag, StateType> = ReadWriteFlag extends "r" ? RecoilValueReadOnly<StateType> : ReadWriteFlag extends "w" ? RecoilState<StateType> : never;
export declare type RecoilStateFamily<T, Selectors> = {
    atom: RecoilState<T>;
} & {
    [key in keyof Selectors]: Selectors[key] extends [
        infer ReadWriteFlag,
        infer SelectorStateType
    ] ? SelectorStateType extends (param: infer Parameter) => infer ReturnType ? (param: Parameter) => RecoilSelectorType<ReadWriteFlag, ReturnType> : RecoilSelectorType<ReadWriteFlag, SelectorStateType> : never;
};
export {};
//# sourceMappingURL=recoil.d.ts.map