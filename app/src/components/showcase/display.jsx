import * as React from "react";
import {
  Box,
  HStack,
  Text,
  Flex,
  Button,
  Tooltip,
  Switch,
} from "@chakra-ui/react";
const axios = require("axios");

export default function Display() {
  const [loading, setLoading] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);
  const [spamTimeout, setSpamTimeout] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [ID, setID] = React.useState("");
  const [flood, setFlood] = React.useState([]);

  const handleGen = async () => {
    setLoading(true);
    await axios.get("http://localhost/gen").then((res) => {
      console.log(res);
      setID(res.data);
      setTimeout(
        () => {
          setLoading(false);
        },
        spamTimeout ? 500 : 0
      );
    });
  };

  const handleFlood = async () => {
    setLoading2(true);
    // I could just have one for loop but this look more awesome
    // Pretty sure this is not healthy but hey I can't help it when my apps go viral...
    await axios
      .all([
        axios.get("http://localhost/flood"),
        axios.get("http://localhost/flood"),
      ])
      .then(
        axios.spread((d1, d2) => {
          console.log(d1.data, d2.data);
          setFlood([...d1.data, d2.data]);
          setTimeout(() => {
            axios
              .all([
                axios.get("http://localhost/flood"),
                axios.get("http://localhost/flood"),
              ])
              .then(
                axios.spread((d_1, d_2) => {
                  console.log(d_1.data, d_2.data);
                  setLoading2(false);
                  for (let i = 0; i < 1000000; i++) {
                    axios
                      .get("http://localhost/flood")
                      .then((d) => console.log(d.data));
                  }
                })
              );
          });
        }, 2000)
      );
  };
  return (
    <>
      <HStack w="100%" alignItems="flex-start">
        <Box bg="gray.100" p={4} rounded="md" w="100%" h="160%">
          <>
            <Box
              d="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
            >
              <Text fontWeight="bold">Manually spam?</Text>
              <Tooltip
                bg="orange.50"
                color="black"
                placement="top"
                hasArrow
                closeOnClick
                isOpen={open ? true : false}
                onOpen={() => {
                  setOpen(true);
                  setTimeout(() => setOpen(false), 1000);
                }}
                closeOnClick={true}
                label="This disables the button loading timeout thingy ma-bobber"
              >
                <Switch
                  colorScheme="orange"
                  p={2}
                  size="md"
                  onChange={() => setSpamTimeout(!spamTimeout)}
                />
              </Tooltip>
            </Box>
            <Text fontWeight="bold">Your Doge ID: {ID}</Text>
            <Box marginTop={2} marginBottom={4}>
              <Flex style={{ justifyContent: "center", alignItems: "center" }}>
                <Button
                  colorScheme="orange"
                  variant="outline"
                  isLoading={loading}
                  loadingText="getting ID"
                  onClick={handleGen}
                >
                  Generate ID
                </Button>
              </Flex>
              <Flex
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Tooltip
                  bg="orange.50"
                  defaultIsOpen
                  color="black"
                  label=" I'm going to be honest, I have no clue what this will do to
                  your machine"
                >
                  <Button
                    colorScheme="orange"
                    variant="outline"
                    isLoading={loading2}
                    loadingText="Crushing my dreams and your machine brb"
                    onClick={handleFlood}
                  >
                    All the UUIDS!
                  </Button>
                </Tooltip>
              </Flex>
            </Box>
          </>
          <HStack w="100%" alignItems="flex-start" marginTop={5}>
            <Text fontWeight="bold">
              {flood.length ? "Check console for full output" : ""}
            </Text>
            <Text fontWeight="bold">{flood.slice(0, 50)}</Text>
          </HStack>
        </Box>
      </HStack>
    </>
  );
}
