import * as React from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Wrap,
  WrapItem,
  Avatar,
} from "@chakra-ui/react";

const Nav = () => {
  return (
    <Box position="sticky" top={0} p={4} bg="orange.100" w="100%">
      <Container maxW="md" d="flex" flexDirection="row">
        <Wrap>
          <WrapItem>
            <Avatar
              name="What da doge doin doe"
              size="lg"
              src={
                "https://assets-jpcust.jwpsrv.com/thumbnails/aib3uyqe-720.jpg"
              }
            />
          </WrapItem>
        </Wrap>
        <Flex w="100%" position="sticky" top={0}>
          <Heading fontSize="200%">
            {" "}
            DogeUUID generator because why not!
          </Heading>
        </Flex>
      </Container>
    </Box>
  );
};

export default Nav;
