import {
  ActionIcon,
  AppShell,
  Burger,
  Flex,
  Header,
  MediaQuery,
  Navbar,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { ReactNode, useState } from "react";
import AuthButtons from "./AuthButtons";
import useAuthStore from "@/stores/auth-store";
import { IconTriangleFilled, IconUser } from "@tabler/icons-react";

type Props = {
  children: ReactNode;
};

function MainLayout(props: Props) {
  const [isNavbarOpened, setIsNavbarOpened] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const user = useAuthStore((state) => state.user);

  return (
    <AppShell
      padding={0}
      navbarOffsetBreakpoint="sm"
      navbar={
        user ? (
          <Navbar
            width={{ sm: "12rem", lg: "16rem" }}
            hiddenBreakpoint="sm"
            hidden={!isNavbarOpened}
          >
            <Navbar.Section p="1rem" pt="2rem" grow>
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
                    transform: `rotate(${isExpanded ? "0" : "90deg"})`,
                    background: "none",
                    ":hover": { background: "none" },
                  }}
                >
                  <IconTriangleFilled />
                </ActionIcon>
                <Text fw="bold">Card decks</Text>
              </Flex>
              <Text
                ml="1.25rem"
                mt="6px"
                display={isExpanded ? "block" : "none"}
              >
                Dummy deck 1
              </Text>
              <Text
                ml="1.25rem"
                mt="6px"
                display={isExpanded ? "block" : "none"}
              >
                Dummy deck 2
              </Text>
            </Navbar.Section>
            <Navbar.Section p="1rem">
              {user && (
                <Flex align="center" gap="8px">
                  <ThemeIcon variant="light" color="neutral.9" radius="xl">
                    <IconUser size="20px" />
                  </ThemeIcon>
                  <Text truncate>
                    {user.firstName} {user.lastName}
                  </Text>
                </Flex>
              )}
            </Navbar.Section>
          </Navbar>
        ) : undefined
      }
      header={
        <Header height={60}>
          <MediaQuery largerThan="lg" styles={{ margin: "0 5rem" }}>
            <MediaQuery largerThan="sm" styles={{ margin: "0 3rem" }}>
              <Flex align="center" h="100%" mx="1rem">
                <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                  <Burger
                    size="sm"
                    opened={isNavbarOpened}
                    onClick={() => setIsNavbarOpened(!isNavbarOpened)}
                  />
                </MediaQuery>
                <AuthButtons />
              </Flex>
            </MediaQuery>
          </MediaQuery>
        </Header>
      }
    >
      {props.children}
    </AppShell>
  );
}

export default MainLayout;
