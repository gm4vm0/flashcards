import { Modal } from "@mantine/core";
import { useState } from "react";
import AddDeckButton from "./AddDeckButton";
import AddDeckForm from "./AddDeckForm";

function AddDeckModal() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <Modal
        title="New Deck"
        centered
        opened={isOpened}
        onClose={() => {
          setIsOpened(false);
        }}
      >
        <AddDeckForm
          onSubmit={() => {
            setIsOpened(false);
          }}
        />
      </Modal>

      <AddDeckButton
        onClick={() => {
          setIsOpened(true);
        }}
      />
    </>
  );
}

export default AddDeckModal;
