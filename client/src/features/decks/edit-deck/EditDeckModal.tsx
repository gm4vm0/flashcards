import { Modal } from "@mantine/core";
import { useState } from "react";
import EditDeckButton from "./EditDeckButton";
import EditDeckForm from "./EditDeckForm";
import { Deck } from "@/types/deck-type";

type Props = {
  deck: Deck;
};

function EditDeckModal(props: Props) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <Modal
        title="Edit Deck"
        centered
        opened={isOpened}
        onClose={() => {
          setIsOpened(false);
        }}
      >
        <EditDeckForm
          deck={props.deck}
          onSubmit={() => {
            setIsOpened(false);
          }}
        />
      </Modal>

      <EditDeckButton
        onClick={() => {
          setIsOpened(true);
        }}
      />
    </>
  );
}

export default EditDeckModal;
