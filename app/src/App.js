import "./App.css";
import { Flex } from "@chakra-ui/react";
import Nav from "./components/nav/nav.jsx";
import Display from "./components/showcase/display";

function App() {
  return (
    <div className="App">
      <Flex flexDirection="column" alignItems="center" justify="center">
        <Nav />
        <Flex p={10} style={{ width: "100%" }}>
          <Display />
        </Flex>
      </Flex>
    </div>
  );
}

export default App;
