import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

type Props = {
  onClick: () => void;
};

function AddFlashcardButton(props: Props) {
  return (
    <Button
      leftIcon={<IconPlus size={20} stroke={2} />}
      color="primary"
      radius="md"
      size="sm"
      onClick={props.onClick}
    >
      Add new card
    </Button>
  );
}

export default AddFlashcardButton;
