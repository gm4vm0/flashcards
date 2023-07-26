import { UnstyledButton } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";

type Props = {
  onClick: () => void;
};

function EditFlashcardButton(props: Props) {
  return (
    <UnstyledButton onClick={props.onClick}>
      <IconPencil strokeWidth={1.5} />
    </UnstyledButton>
  );
}

export default EditFlashcardButton;
