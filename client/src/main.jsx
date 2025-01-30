import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import GeminiContextProvider from "./context/ResponseContext";
import AuthContextProvider from "./context/AuthContext";

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <ChakraProvider>
    <AuthContextProvider>
      <GeminiContextProvider>
        <App />
      </GeminiContextProvider>
    </AuthContextProvider>
  </ChakraProvider>
);
