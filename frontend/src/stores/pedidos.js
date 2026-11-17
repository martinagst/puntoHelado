import { create } from "zustand";

export const usePedidoStore = create((set) => ({
  tamanio: null,
  sabores: [],
  salsa: null,

  seleccionarTamanio: (tamanio) =>
    set((state) => ({
      tamanio,
      sabores: state.sabores.slice(0, tamanio.bochas),
    })),

  seleccionarSabor: (sabor) =>
    set((state) => {
      if (state.sabores.length >= (state.tamanio?.bochas ?? 0)) {
        return state;
      }

      return {
        sabores: [...state.sabores, sabor],
      };
    }),

  seleccionarSalsa: (salsa) =>
    set(() => ({
      salsa,
    })),

  limpiarPedido: () =>
    set({
      tamanio: null,
      sabores: [],
      salsa: null,
    }),
}));