import { ChakraProvider } from "@chakra-ui/react";

import { Routes } from "./route";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
