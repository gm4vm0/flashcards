import useDecksStore from "@/stores/decks-store";
import { User } from "@/types/user-type";
import {
  ActionIcon,
  Flex,
  Navbar as MantineNavbar,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { IconTriangleFilled, IconUser } from "@tabler/icons-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

type Props = {
  isNavbarOpened: boolean;
  setIsNavbarOpened: (isNavbarOpened: boolean) => void;
  user: User;
};

function Navbar(props: Props) {
  const [isExpanded, setIsExpanded] = useState(true);

  const decks = useDecksStore((state) => state.decks);

  return (
    <MantineNavbar
      width={{ sm: "12rem", lg: "16rem" }}
      hiddenBreakpoint="sm"
      hidden={!props.isNavbarOpened}
    >
      <MantineNavbar.Section p="1rem" pt="2rem" grow>
        <Flex
          align="center"
          gap="0.5rem"
          onClick={() => setIsExpanded(!isExpanded)}
          sx={{ ":hover": { cursor: "pointer" } }}
        >
          <ActionIcon
            variant="light"
            color="neutral.9"
            size="0.75rem"
            sx={{
              border: "none",
              transform: `rotate(${isExpanded ? "180deg" : "90deg"})`,
              background: "none",
              ":hover": { background: "none" },
            }}
          >
            <IconTriangleFilled />
          </ActionIcon>
          <Text fw="bold">Card decks</Text>
        </Flex>
        {decks.map((deck) => (
          <Text
            key={deck.id}
            component={NavLink}
            to={`/deck/${deck.id}`}
            ml="1.25rem"
            mt="6px"
            display={isExpanded ? "block" : "none"}
            sx={(theme) => ({
              "&.active": {
                color: theme.colors.primary[4],
                fontWeight: "bold",
              },
            })}
          >
            {deck.name}
          </Text>
        ))}
      </MantineNavbar.Section>
      <MantineNavbar.Section p="1rem">
        {props.user && (
          <Flex align="center" gap="8px">
            <ThemeIcon variant="light" color="neutral.9" radius="xl">
              <IconUser size="20px" />
            </ThemeIcon>
            <Text truncate>
              {props.user.firstName} {props.user.lastName}
            </Text>
          </Flex>
        )}
      </MantineNavbar.Section>
    </MantineNavbar>
  );
}

export default Navbar;
