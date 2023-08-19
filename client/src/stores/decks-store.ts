import { Deck } from "@/types/deck-type";
import { create } from "zustand";

type DecksState = {
  decks: Deck[];
  setDecks: (decks: Deck[]) => void;
  addDeck: (deck: Deck) => void;
  updateDeck: (deckId: string, updateData: { name?: string }) => void;
  currentDeck: Deck | null;
};

const useDecksStore = create<DecksState>((set) => ({
  decks: [],
  setDecks: (decks) => set({ decks }),
  addDeck: (deck) => set((state) => ({ decks: [...state.decks, deck] })),
  updateDeck: (deckId, updateData) =>
    set((state) => {
      const newDecks = state.decks.map((deck) => {
        if (deck.id === deckId) {
          return Object.assign(deck, updateData);
        } else return deck;
      });
      return { decks: newDecks };
    }),
  currentDeck: null,
}));

export default useDecksStore;
