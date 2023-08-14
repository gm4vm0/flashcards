import {
  AppShell,
  Burger,
  Divider,
  Flex,
  Header,
  MediaQuery,
  Navbar,
  Text,
} from "@mantine/core";
import { ReactNode, useState } from "react";
import AuthButtons from "./AuthButtons";
import useAuthStore from "@/stores/auth-store";

type Props = {
  children: ReactNode;
};

function MainLayout(props: Props) {
  const [isNavbarOpened, setIsNavbarOpened] = useState(false);
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
            <Navbar.Section grow>
              <Text>Navbar</Text>
            </Navbar.Section>
            <Divider />
            <Navbar.Section>
              {user && <Text>User: {user.firstName}</Text>}
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
