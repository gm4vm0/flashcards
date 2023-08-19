import { Modal } from "@mantine/core";
import { useState } from "react";
import AddDeckButton from "./AddDeckButton";
import AddDeckForm from "./AddDeckForm";

function AddDeckModal() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <Modal
        title="Add new deck"
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
