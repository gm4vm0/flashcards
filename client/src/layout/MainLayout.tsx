import { AppShell } from "@mantine/core";
import { ReactNode, useState } from "react";
import useAuthStore from "@/stores/auth-store";
import Navbar from "./Navbar";
import Header from "./Header";

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
            isNavbarOpened={isNavbarOpened}
            setIsNavbarOpened={setIsNavbarOpened}
            user={user}
          />
        ) : undefined
      }
      header={
        <Header
          isNavbarOpened={isNavbarOpened}
          setIsNavbarOpened={setIsNavbarOpened}
        />
      }
    >
      {props.children}
    </AppShell>
  );
}

export default MainLayout;
