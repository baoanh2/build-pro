import { create } from "zustand";
import { UserState, UserActions } from "./defs";
import { createUserActions } from "./actions";
import { initialUserState } from "./states";

export const useUserStore = create<UserState & UserActions>()((...a) => ({
  ...initialUserState,
  ...createUserActions(...a),
}));
