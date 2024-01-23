import { create } from 'zustand';

const useInfoModalStore = create((set) => ({
  moviedata: [],
  isOpen: false,
  openModal: (moviedata) => set({ isOpen: true, moviedata }),
  closeModal: () => set({ isOpen: false, moviedata: [] }),
}));

export default useInfoModalStore;
