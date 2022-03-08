"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setWithGuard = void 0;
const recoil_1 = require("recoil");
const guardRecoilDefaultValue = (candidate) => {
    if (candidate instanceof recoil_1.DefaultValue)
        return true;
    return false;
};
const setWithGuard = (setter) => {
    return ({ set, get, reset }, newValue) => {
        if (guardRecoilDefaultValue(newValue))
            return;
        setter({ set, get, reset }, newValue);
    };
};
exports.setWithGuard = setWithGuard;
