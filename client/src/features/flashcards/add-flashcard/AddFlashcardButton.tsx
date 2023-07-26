import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

type Props = {
  onClick: () => void;
};

function AddFlashcardButton(props: Props) {
  return (
    <Button
      leftIcon={<IconPlus size={20} stroke={2} />}
      variant="default"
      color="gray"
      mt="1.5rem"
      radius="md"
      size="sm"
      styles={{ label: { fontWeight: "normal" } }}
      onClick={props.onClick}
    >
      Add New Card
    </Button>
  );
}

export default AddFlashcardButton;
