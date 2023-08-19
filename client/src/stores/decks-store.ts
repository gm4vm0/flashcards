import { Deck } from "@/types/deck-type";
import { create } from "zustand";

type DecksState = {
  decks: Deck[];
  setDecks: (decks: Deck[]) => void;
  addDeck: (deck: Deck) => void;
  currentDeck: Deck | null;
};

const useDecksStore = create<DecksState>((set) => ({
  decks: [],
  setDecks: (decks) => set({ decks }),
  addDeck: (deck) => set((state) => ({ decks: [...state.decks, deck] })),
  currentDeck: null,
}));

export default useDecksStore;
