import { Modal } from "@mantine/core";
import { useState } from "react";
import EditFlashcardButton from "./EditFlashcardButton";
import EditFlashCardForm from "./EditFlashcardForm";
import { Card } from "@/types/card-type";

type Props = {
  card: Card;
};

function EditFlashcardModal(props: Props) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <Modal
        title="Edit Card"
        centered
        opened={isOpened}
        onClose={() => {
          setIsOpened(false);
        }}
      >
        <EditFlashCardForm
          card={props.card}
          onSubmit={() => {
            setIsOpened(false);
          }}
        />
      </Modal>

      <EditFlashcardButton
        onClick={() => {
          setIsOpened(true);
        }}
      />
    </>
  );
}

export default EditFlashcardModal;
