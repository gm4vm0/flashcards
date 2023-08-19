import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

type Props = {
  onClick: () => void;
};

function AddDeckButton(props: Props) {
  return (
    <Button
      leftIcon={<IconPlus size={20} stroke={2} />}
      color="primary"
      radius="md"
      size="sm"
      onClick={props.onClick}
    >
      Add New Deck
    </Button>
  );
}

export default AddDeckButton;
