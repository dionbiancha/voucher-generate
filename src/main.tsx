import React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import App from "./App";
import theme from "./theme";
import "./i18n";
import { PreviewProvider } from "./context/PreviewContext";

createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <PreviewProvider>
      <App />
    </PreviewProvider>
  </ChakraProvider>
);
