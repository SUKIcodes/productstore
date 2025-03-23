import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        justifyContent={"space-between"}
        alignItems={"center"}
        flexDir={["column", "row"]}
      >
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize={["2xl", "3xl"]}
          fontWeight="extrabold"
        >
          <Link to="/">Productify</Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
          <Link to="/create">
            <Button>
              <FaPlus />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? "🌙" : "☀️"}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
