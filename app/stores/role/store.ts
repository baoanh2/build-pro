import { create } from "zustand";
import { RoleActions, RoleState } from "./defs";
import { createRoleActions } from "./actions";
import { initialRoleState } from "./states";

export const useRoleStore = create<RoleState & RoleActions>()((...a) => ({
  ...initialRoleState,
  ...createRoleActions(...a),
}));
