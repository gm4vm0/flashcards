import {
  Burger,
  Flex,
  Header as MantineHeader,
  MediaQuery,
} from "@mantine/core";
import AuthButtons from "./AuthButtons";

type Props = {
  isNavbarOpened: boolean;
  setIsNavbarOpened: (isNavbarOpened: boolean) => void;
};

function Header(props: Props) {
  return (
    <MantineHeader height={60}>
      <MediaQuery largerThan="lg" styles={{ margin: "0 5rem" }}>
        <MediaQuery largerThan="sm" styles={{ margin: "0 3rem" }}>
          <Flex align="center" h="100%" mx="1rem">
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                size="sm"
                opened={props.isNavbarOpened}
                onClick={() => props.setIsNavbarOpened(!props.isNavbarOpened)}
              />
            </MediaQuery>
            <AuthButtons />
          </Flex>
        </MediaQuery>
      </MediaQuery>
    </MantineHeader>
  );
}

export default Header;
