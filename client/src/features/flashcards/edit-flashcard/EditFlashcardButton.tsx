import { ActionIcon } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";

type Props = {
  onClick: () => void;
};

function EditFlashcardButton(props: Props) {
  return (
    <ActionIcon onClick={props.onClick} color="neutral.9">
      <IconPencil strokeWidth={1.5} />
    </ActionIcon>
  );
}

export default EditFlashcardButton;
