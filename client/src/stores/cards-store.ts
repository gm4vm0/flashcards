import { Card } from "@/types/card-type";
import { create } from "zustand";

type CardsState = {
  cards: Card[];
  setCards: (cards: Card[]) => void;
  currentCardIndex: number;
  addCard: (card: Card) => void;
  updateCard: (
    cardId: string,
    updateData: { front?: string; back?: string }
  ) => void;
  deleteCard: (cardId: string) => void;
  setNextCard: () => void;
  setPrevCard: () => void;
};

const useCardsStore = create<CardsState>((set) => ({
  cards: [],
  setCards: (cards) => set({ cards: cards }),
  currentCardIndex: 0,
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
  setNextCard: () =>
    set((state) => ({
      currentCardIndex:
        state.currentCardIndex >= state.cards.length - 1
          ? state.currentCardIndex
          : state.currentCardIndex + 1,
    })),
  setPrevCard: () =>
    set((state) => ({
      currentCardIndex:
        state.currentCardIndex <= 0
          ? state.currentCardIndex
          : state.currentCardIndex - 1,
    })),
}));

export default useCardsStore;
