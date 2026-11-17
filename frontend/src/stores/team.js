
import { create } from "zustand";

export const useTeamStore = create((set) => ({
  members: [],
  selected: null,

  add: (m) => set((s) => ({members: [...s.members, { id: new Date(), ...m }],
    })),

  select: (m) => set({ selected: m }),
}));
