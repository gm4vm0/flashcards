import { Deck } from "@/types/deck-type";
import { create } from "zustand";

type DecksState = {
  decks: Deck[];
  setDecks: (decks: Deck[]) => void;
  currentDeck: null;
};

const useDecksStore = create<DecksState>((set) => ({
  decks: [],
  setDecks: (decks) => set({ decks }),
  currentDeck: null,
}));

export default useDecksStore;
