import { Modal } from "@mantine/core";
import { useState } from "react";
import AddFlashcardButton from "./AddFlashcardButton";
import AddFlashCardForm from "./AddFlashCardForm";

function AddFlashcardModal() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <Modal
        title="Add new card"
        padding="xl"
        centered
        opened={isOpened}
        onClose={() => {
          setIsOpened(false);
        }}
        styles={(theme) => ({
          title: {
            fontSize: theme.fontSizes.lg,
            fontWeight: "bold",
          },
        })}
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
