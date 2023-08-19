import { ActionIcon } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";

type Props = {
  onClick: () => void;
};

function EditDeckButton(props: Props) {
  return (
    <ActionIcon onClick={props.onClick} color="neutral.9">
      <IconPencil size="20" strokeWidth={1.5} />
    </ActionIcon>
  );
}

export default EditDeckButton;
