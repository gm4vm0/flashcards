import { Card } from "@/types/card-type";
import { create } from "zustand";

type CardsState = {
  cards: Card[];
  setCards: (cards: Card[]) => void;
  addCard: (card: Card) => void;
  updateCard: (
    cardId: string,
    updateData: { front?: string; back?: string }
  ) => void;
  deleteCard: (cardId: string) => void;
};

const useCardsStore = create<CardsState>((set) => ({
  cards: [],
  setCards: (cards) => set({ cards: cards }),
  addCard: (card) => set((state) => ({ cards: [...state.cards, card] })),
  updateCard: (cardId, updateData) =>
    set((state) => {
      const newCards = state.cards.map((card) => {
        if (card.id === cardId) {
          return Object.assign(card, updateData);
        } else return card;
      });
      return { cards: newCards };
    }),
  deleteCard: (cardId) => {
    set((state) => {
      const newCards = state.cards.filter((card) => card.id !== cardId);
      return { cards: newCards };
    });
  },
}));

export default useCardsStore;
