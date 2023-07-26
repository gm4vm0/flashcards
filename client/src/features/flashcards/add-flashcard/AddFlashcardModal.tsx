import { Modal } from "@mantine/core";
import { useState } from "react";
import AddFlashcardButton from "./AddFlashcardButton";
import AddFlashCardForm from "./AddFlashCardForm";

function AddFlashcardModal() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <Modal
        title="New Card"
        centered
        opened={isOpened}
        onClose={() => {
          setIsOpened(false);
        }}
      >
        <AddFlashCardForm
          onSubmit={() => {
            setIsOpened(false);
          }}
        />
      </Modal>

      <AddFlashcardButton
        onClick={() => {
          setIsOpened(true);
        }}
      />
    </>
  );
}

export default AddFlashcardModal;
