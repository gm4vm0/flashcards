import {
  AppShell,
  Burger,
  Flex,
  Header,
  MediaQuery,
  Navbar,
  Text,
} from "@mantine/core";
import { ReactNode, useState } from "react";
import AuthButtons from "./AuthButtons";

type Props = {
  children: ReactNode;
};

function MainLayout(props: Props) {
  const [isNavbarOpened, setIsNavbarOpened] = useState(false);

  return (
    <AppShell
      padding={0}
      navbarOffsetBreakpoint="sm"
      navbar={
        <Navbar
          width={{ sm: "12rem", lg: "16rem" }}
          hiddenBreakpoint="sm"
          hidden={!isNavbarOpened}
          withBorder
        >
          <Text>Navbar</Text>
        </Navbar>
      }
      header={
        <Header height={50}>
          <Flex align="center" h="100%" px="1rem">
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                size="sm"
                opened={isNavbarOpened}
                onClick={() => setIsNavbarOpened(!isNavbarOpened)}
              />
            </MediaQuery>
            {/* TODO: make header elements responsive */}
            <AuthButtons />
          </Flex>
        </Header>
      }
    >
      {props.children}
    </AppShell>
  );
}

export default MainLayout;
